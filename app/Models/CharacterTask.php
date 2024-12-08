<?php

namespace App\Models;

use App\Models\Task as ModelsTask;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CharacterTask extends Model
{
  /** @use HasFactory<\Database\Factories\CharacterTaskFactory> */
  use HasFactory;

  protected $fillable = [
    'assign_to',
    'done',
  ];
}
