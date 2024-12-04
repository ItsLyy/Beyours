<?php

namespace App\Models;

use App\Models\Task as ModelsTask;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CharacterTask extends Model
{
  /** @use HasFactory<\Database\Factories\CharacterTaskFactory> */
  use HasFactory;

  public function assignTo()
  {
    return $this->belongsTo(Character::class, 'assign_to');
  }

  public function task()
  {
    return $this->belongsTo(ModelsTask::class, 'task_id');
  }
}
