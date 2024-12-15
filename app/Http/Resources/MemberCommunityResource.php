<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberCommunityResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      "id" => $this->id,
      "fullname" => $this->fullname,
      "profession" => $this->profession,
      "role" => $this->community->role,
      "photo_profile" => $this->user->photo_profile,
      "email" => $this->user->email,
      "phone_number" => $this->user->phone_number,
      "skills" => SkillResource::collection($this->skills),
    ];
  }
}
