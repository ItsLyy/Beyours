<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
  /** @use HasFactory<\Database\Factories\CommunityFactory> */
  use HasFactory;

  protected $fillable = [
    'name',
    'description',
    'banner_path',
    'attendance',
    'join_token',
  ];

  public function attendances()
  {
    return $this->hasMany(Attendance::class);
  }

  public function members()
  {
    return $this->belongsToMany(Character::class, "character_communities", "community_id", "character_id")->as('community')->withTimestamps()->withPivot("role");
  }

  public function isJoined()
  {
    $character = auth()->user()->character;
    return $this->belongsToMany(Character::class, "character_communities", "community_id", "character_id")->as('community')->withTimestamps()->withPivot("role")->wherePivot('character_id', $character->id);
  }

  public function tasks()
  {
    return $this->hasMany(Task::class);
  }
}
