<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    /** @use HasFactory<\Database\Factories\CommunityFactory> */
    use HasFactory;

    protected $fillable = [
      'name',
      'description',
      'banner_path',
      'attendance',
    ];

    public function attendance() {
      return $this->hasMany(Attendances::class);
    }

    public function member() {
      return $this->hasMany(CharacterCommunity::class);
    }

    public function tasks() {
      return $this->hasMany(Task::class);
    }
}
