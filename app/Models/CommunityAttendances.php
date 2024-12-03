<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommunityAttendances extends Model
{
  /** @use HasFactory<\Database\Factories\CommunityAttendancesFactory> */
  use HasFactory;

  public function characters() {
    return $this->hasMany(Character::class);
  }

  public function attendances() {
    return $this->hasMany(Attendances::class);
  }
}
