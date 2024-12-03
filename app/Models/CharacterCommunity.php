<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CharacterCommunity extends Model
{
    /** @use HasFactory<\Database\Factories\CharacterCommunityFactory> */
    use HasFactory;

    protected $fillable = [
      'role',
    ];

    public function character() {
      return $this->hasMany(Character::class);
    }
}
