<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendances extends Model
{
    /** @use HasFactory<\Database\Factories\AttendancesFactory> */
    use HasFactory;

    public function attendanceCommunities() {
      return $this->hasMany(CharacterCommunity::class);
    }
}
