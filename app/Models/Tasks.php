<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
  /** @use HasFactory<\Database\Factories\TasksFactory> */
  use HasFactory;

  protected $fillable = [
    'title',
    'description',
  ];

  public function assignBy() {
    return $this->hasOne(Character::class);
  }

  public function rewards() {
    return $this->hasMany(Reward::class);
  }

}
