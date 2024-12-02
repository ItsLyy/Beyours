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
    ];

    protected $hidden = [
      'health',
      'level',
      'experience',
      'user_id',
    ];
}
