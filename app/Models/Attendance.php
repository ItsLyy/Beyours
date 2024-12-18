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
    return $this->belongsToMany(Character::class, 'community_attendances')->as('attendance')->withPivot('first_photo_path', 'second_photo_path', 'journal', 'status', 'verified', 'first_attendance_time', 'second_attendance_time');
  }
}
