<?php

use App\Http\Resources\UserResource;
use App\Models\Character;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('online', function ($user) {
  return $user ? new UserResource($user) : null;
});

Broadcast::channel('leveling.character.{character}', function (User $user, Character $character) {
  return $user->character->id === $character->id;
});
