<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
  /** @use HasFactory<\Database\Factories\AttendancesFactory> */
  use HasFactory;

  protected $fillable = [
    'community_id',
  ];

  public function community()
  {
    return $this->belongsTo(Community::class);
  }

  public function characters()
  {
    // return $this->belongsToMany(Character::class, 'community_attendances')->withTimestamps()->withPivot('first_photo_path', 'second_photo_path', 'journal', 'status', 'verified');
    return $this->belongsToMany(Character::class, 'community_attendances')->as('attendance')->withTimestamps()->withPivot('first_photo_path', 'second_photo_path', 'journal', 'status', 'verified');
  }

}
