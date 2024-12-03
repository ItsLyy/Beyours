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
      'health',
      'level',
      'experience',
    ];

    protected $hidden = [
      'user_id',
    ];

    public function skills() {
      return $this->hasMany(Skill::class);
    }
}
