<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommunityDetailResource;
use App\Http\Resources\CommunityResource;
use App\Http\Resources\MemberCommunityResource;
use App\Models\Character;
use App\Models\Community;
use Illuminate\Container\Attributes\Storage;
use Illuminate\Http\Request;

class CommunityController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $characterId = auth()->user()->character->id;
    $community = Community::whereHas('members', function ($query) use ($characterId) {
      $query->where('characters.id', $characterId);
    })->get();

    return inertia('Community/Index', [
      "communities" => CommunityResource::collection($community)
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return inertia('Community/Create', [
      "logoBeyours" => asset('storage/logobeyours.svg'),
    ]);
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

    if ($request->has('banner_image_file')) {
      $fileCommunityBanner = $request->file('banner_image_file');
      $extensionCommunityBanner = $fileCommunityBanner->getClientOriginalExtension();

      $fileNameCommunityBanner = time() . '.' . $extensionCommunityBanner;
      $pathCommunityBanner = 'images/banner_community/' . str()->random(20);
      $fileCommunityBanner->move($pathCommunityBanner, $fileNameCommunityBanner);
    }

    $dataCommunity = [
      "name" => $validateCommunity["name"],
      "description" => $validateCommunity["description"],
      "attendance" => $validateCommunity["attendance"],
      "join_token" => str()->random(20),
      "banner_path" => $pathCommunityBanner . '/' . $fileNameCommunityBanner,
    ];

    $community = Community::create($dataCommunity);

    $community->members()->sync([$character->id => ["role" => "owner"]]);

    return to_route('community.index');
  }

  /**
   * Display the specified resource.
   */
  public function show(Community $community)
  {
    $characterId = auth()->user()->character->id;

    $community = $community->load('members');
    $members = $community->members;
    $character = $members->firstWhere('id', $characterId);
    $ownerCommunity = $members->firstWhere('community.role', 'owner');

    return inertia('Community/Show', [
      "community" => new CommunityResource($community),
      "character" => new MemberCommunityResource($character),
      "members" => MemberCommunityResource::collection($members),
      "ownerCommunity" => new MemberCommunityResource($ownerCommunity),
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

  public function join(string $token)
  {
    $character = auth()->user()->character;

    $community = Community::where('join_token', $token)->first();

    if (!$community) {
      return to_route('community.index')->with(response('There is no community', 401));
    }

    $community->members()->syncWithoutDetaching([
      $character->id => [
        'community_id' => $community->id,
        'role' => 'member',
      ],
    ]);

    return route('community.index');
  }
}
