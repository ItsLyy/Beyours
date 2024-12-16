<?php

namespace App\Http\Resources;

use App\Models\Character;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
      "username" => $this->username,
      "email" => $this->email,
      "photo_profile" => $this->photo_profile,
      "phone_number" => $this->phone_number,
      'character' => new CharacterResource($this->character),
      "address" => $this->address,
    ];
  }
}
