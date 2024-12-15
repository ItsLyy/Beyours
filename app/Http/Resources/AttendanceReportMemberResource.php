<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceReportMemberResource extends JsonResource
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
      "address" => $this->user->address,
      "email" => $this->user->email,
      "phone_number" => $this->user->phone_number,
      "attendances" => new AttendanceMemberResource($this->attendances->where('pivot.verified', 1)->find($this->attendance->attendance_id)),
    ];
  }
}
