<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
  /** @use HasFactory<\Database\Factories\TasksFactory> */
  use HasFactory;

  protected $fillable = [
    'title',
    'description',
    'assign_by',
    'community_id',
    'due_at',
  ];

  public function assignBy() {
    return $this->belongsTo(Character::class, 'assign_by');
  }

  public function rewards() {
    return $this->hasMany(Reward::class);
  }

  public function assignTo() {
    return $this->belongsToMany(Character::class,'character_tasks', 'task_id', 'assign_to')->withTimestamps()->withPivot('done');
  }
}
