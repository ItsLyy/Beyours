<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommunityMemberResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
      $user = User::find($this->user_id);
      return [
        "id" => $this->id,
        "fullname" => $this->fullname,
        "description" => $this->description,
        "role" => $this->pivot->role,
        "banner_path" => $this->banner_path,
        "attendance" => $this->attendance,
        "user" => $user,
        "community" => $this->community,
      ];
    }
}
