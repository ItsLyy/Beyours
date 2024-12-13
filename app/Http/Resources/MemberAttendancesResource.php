<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberAttendancesResource extends JsonResource
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
      "photo_profile" => $this->user->photo_profile,
      "attendances" => new AttendanceMemberResource($this->attendances->first()),
    ];
  }
}
