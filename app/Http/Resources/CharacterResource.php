<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CharacterResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'fullname' => $this->fullname,
      'health' => $this->health,
      'level' => $this->level,
      'experience' => $this->experience,
      'profession' => $this->profession,
      'pkl' => $this->pkl,
      'instructor' => $this->instructor,
      'skills' => SkillResource::collection($this->skills),
      'created_at' => $this->created_at,
      'photo_profile' => $this->user->photo_profile,
    ];
  }
}
