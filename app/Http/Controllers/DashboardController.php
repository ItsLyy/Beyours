<?php

namespace App\Http\Controllers;

use App\Http\Resources\CharacterResource;
use App\Models\CharacterCommunity;
use Illuminate\Console\View\Components\Task;
use Illuminate\Http\Request;
use App\Http\Resources\TaskDetailResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Character;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $character = auth()->user()->character;
    $userGlobals = User::get();

    if (!$character) {
      return redirect(route('character.index'));
    }

    $tasks = $character->tasks()->skip(0)->take(10)->get();

    return inertia('Dashboard/Index', [
      "tasks" => TaskDetailResource::collection($tasks),
      "character" => new CharacterResource($character),
      "globalFriends" => UserResource::collection($userGlobals),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
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
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
