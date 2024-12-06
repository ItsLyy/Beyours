<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommunityDetailResource;
use App\Http\Resources\CommunityMemberResource;
use App\Http\Resources\CommunityResource;
use App\Models\CharacterCommunity;
use App\Models\Community;
use Illuminate\Http\Request;

class CommunityController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $character = auth()->user()->character;

    return inertia('Community/Index', [
      "communities" => CommunityResource::collection($character->communities()->with('characters')->get())
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return inertia('Community/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $character = auth()->user()->character;

    $validateCommunity = $request->validate([
      "name" => 'required|max:50|string',
      "description" => 'required|max:255|string',
      "attendance" => 'required|boolean',
      "banner_image_file" => 'required|mimes:png,jpg,jpeg,webp',
    ]);

    if($request->has('banner_image_file')) {
      $fileCommunityBanner = $request->file('banner_image_file');
      $extensionCommunityBanner = $fileCommunityBanner->getClientOriginalExtension();

      $fileNameCommunityBanner = time().'.'.$extensionCommunityBanner;
      $pathCommunityBanner = 'images/banner_community/'. str()->random(20);
      $fileCommunityBanner->move($pathCommunityBanner, $fileNameCommunityBanner);
    }

    $dataCommunity = [
      "name" => $validateCommunity["name"],
      "description" => $validateCommunity["description"],
      "attendance" => $validateCommunity["attendance"],
      "join_token" => str()->random(20),
      "banner_path" => $pathCommunityBanner.'/'.$fileNameCommunityBanner,
    ];

    $community = Community::create($dataCommunity);

    $community->characters()->sync([$character->id => ["role" => "owner"]]);

    return to_route('community.index');
  }

  /**
   * Display the specified resource.
   */
  public function show(Community $community)
  {
    $character = auth()->user()->character;

    return inertia("Community/Show", [
      "community" => $community,
      "yourCharacter" => $character->communities->where('pivot.community_id', $community->id)->first(),
      "members" => $community->characters,
    ]);
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
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }

  public function join(string $token) {
    $character = auth()->user()->character;

    $community = Community::where('join_token', $token)->first();

    if (!$community) {
      return to_route('community.index');
    }

    $community->characters()->syncWithoutDetaching([
        $character->id => [
            'role' => 'member',
        ],
    ]);

    return to_route('community.index');
  }
}
