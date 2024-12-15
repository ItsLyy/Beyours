<?php

namespace App\Http\Controllers;

use App\Models\Character;
use App\Models\Skill;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class CharacterController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return inertia('Character/Index');
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return inertia('Character/Create', [
      'default_avatar' => asset('images/defaultavatar.png'),
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $user = auth()->user();

    $validadateCharacter = $request->validate([
      "fullname" => 'required|max:50|string',
      "pkl" => 'required|max:50|string',
      "profession" => 'required|max:30|string',
      "character_banner" => 'required|mimes:png,jpg,jpeg,webp',
    ]);

    $validateUser = $request->validate([
      "phone_number" => 'required|max:20|string',
      "address" => 'required|max:255|string',
      "photo_profile" => 'required|mimes:png,jpg,jpeg,webp',
    ]);

    $validateSkill = $request->validate([
      "first_skill" => 'required|max:20|string',
      "second_skill" => 'required|max:20|string',
    ]);


    if ($request->has('photo_profile')) {
      $filePhotoProfile = $request->file('photo_profile');
      $extensionPhotoProfile = $filePhotoProfile->getClientOriginalExtension();

      $filenamePhotoProfile = time() . '.' . $extensionPhotoProfile;
      $pathPhotoProfile = 'user/photo_profile/' . $user->id;
      $filePhotoProfile->move($pathPhotoProfile, $filenamePhotoProfile);
    }

    if ($request->has('character_banner')) {
      $fileCharacterBanner = $request->file('character_banner');
      $extensionCharacterBanner = $fileCharacterBanner->getClientOriginalExtension();

      $filenameCharacterBanner = time() . '.' . $extensionCharacterBanner;
      $pathCharacterBanner = 'user/character_banner/' . $user->id;
      $fileCharacterBanner->move($pathCharacterBanner, $filenameCharacterBanner);
    }

    $dataCharacter = [
      "fullname" => $validadateCharacter['fullname'],
      "profession" => $validadateCharacter['profession'],
      "pkl" => $validadateCharacter['pkl'],
      "banner_path" => $pathCharacterBanner . '/' . $filenameCharacterBanner,
      "health" => 5,
      "level" => 1,
      "experience" => 0,
      "user_id" => $user->id,
    ];


    $dataUser = [
      "phone_number" => $validateUser['phone_number'],
      "address" => $validateUser['address'],
      "photo_profile" => $pathPhotoProfile . '/' . $filenamePhotoProfile,
    ];

    $character = Character::create($dataCharacter);
    User::where('id', $user->id)->update($dataUser);
    return $character;

    $dataSkills = [
      ["character_id" => $character->id, "name" => "Health", "level" => 1, "experience" => 0, "created_at" => Carbon::now()->toDateTimeString(), "updated_at" => Carbon::now()->toDateTimeString()],
      ["character_id" => $character->id, "name" => "Dicipline", "level" => 1, "experience" => 0, "created_at" => Carbon::now()->toDateTimeString(), "updated_at" => Carbon::now()->toDateTimeString()],
      ["character_id" => $character->id, "name" => "Charisma", "level" => 1, "experience" => 0, "created_at" => Carbon::now()->toDateTimeString(), "updated_at" => Carbon::now()->toDateTimeString()],
      ["character_id" => $character->id, "name" => $validateSkill['first_skill'], "level" => 1, "experience" => 0, "created_at" => Carbon::now()->toDateTimeString(), "updated_at" => Carbon::now()->toDateTimeString()],
      ["character_id" => $character->id, "name" => $validateSkill['second_skill'], "level" => 1, "experience" => 0, "created_at" => Carbon::now()->toDateTimeString(), "updated_at" => Carbon::now()->toDateTimeString()],
    ];

    Skill::insert($dataSkills);

    return to_route('dashboard');
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    return Redirect::route('profile.edit');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
