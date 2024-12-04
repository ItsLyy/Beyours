<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
  /** @use HasFactory<\Database\Factories\CharacterFactory> */
  use HasFactory;

  protected $fillable = [
    'fullname',
    'health',
    'level',
    'experience',
    'user_id',
  ];

  protected $hidden = [
    'user_id',
  ];

  public function skills()
  {
    return $this->hasMany(Skill::class, 'character_id');
  }

  public function tasks()
  {
    return $this->hasMany(CharacterTask::class, 'assign_to');
  }

  public function communities()
  {
    return $this->hasMany(CharacterCommunity::class);
  }

  public function user() {
    return $this->hasOne(User::class);
  }
}
