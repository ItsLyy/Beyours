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
      $owner = $this->characters->firstWhere('pivot.role', 'owner');
      return [
        "id" => $this->id,
        'name' => $this->name,
        'description' => $this->description,
        'banner_path' => $this->banner_path,
        'attendance' => $this->attendance,
        'owner' => [
          "id" => $owner->id,
          "name" => $owner->fullname,
        ]
      ];
    }
}
