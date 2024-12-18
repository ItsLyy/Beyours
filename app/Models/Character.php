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
    'profession',
    'banner_path',
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
    return $this->belongsToMany(Task::class, 'character_tasks', 'assign_to', 'task_id')->as('task')->withTimestamps()->withPivot('done');
  }

  public function communities()
  {
    return $this->belongsToMany(Community::class, 'character_communities', "character_id", "community_id")->as("members")->withTimestamps()->withPivot('role');
  }

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function attendances()
  {
    return $this->belongsToMany(
      Attendance::class,
      'community_attendances'
    )->withPivot('first_photo_path', 'second_photo_path', 'journal', 'status', 'verified', 'first_attendance_time', 'second_attendance_time');
  }

  public function checkLevelUp()
  {
    $maxExperience = 10 ** $this->level;

    if ($this->experience >= $maxExperience) {
      $this->update(['level' => $this->level + 1]);
    }

    $this->skills->each(function ($skill) {
      $maxSkillExperience = 15 ** $skill->level;
      if ($skill->experience >= $maxSkillExperience) {
        $skill->update(['level' => $skill->level + 1]);
      }
    });
  }
}
