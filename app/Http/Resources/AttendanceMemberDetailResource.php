<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceMemberDetailResource extends JsonResource
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
      "attendance_id" => $this->attendance->attendance_id,
      "character_id" => $this->attendance->character_id,
      "first_photo_path" => $this->attendance->first_photo_path ? asset($this->attendance->first_photo_path) : null,
      "second_photo_path" => $this->attendance->second_photo_path ? asset($this->attendance->second_photo_path) : null,
      "status" => $this->attendance->status,
      "journal" => $this->attendance->journal,
      "first_attendance_time" => $this->attendance->first_attendance_time,
      "second_attendance_time" => $this->attendance->second_attendance_time,
      "verify" => $this->attendance->verify,
    ];
  }
}
