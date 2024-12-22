<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommunityResource extends JsonResource
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
      'name' => $this->name,
      'description' => $this->description,
      'banner_path' => asset($this->banner_path),
      'token' => $this->join_token,
      'attendance' => $this->attendance,
      'members' => MemberCommunityResource::collection($this->members),
    ];
  }
}
