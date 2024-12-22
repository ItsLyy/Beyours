<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceMemberResource extends JsonResource
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
      "community_id" => $this->community_id,
      "pivot" => [
        "attendance_id" => $this->pivot->attendance_id,
        "character_id" => $this->pivot->character_id,
        "journal" => $this->pivot->journal,
        "first_photo_path" => $this->pivot->first_photo_path ? asset($this->pivot->first_photo_path) : null,
        "second_photo_path" => $this->pivot->second_photo_path ? asset($this->pivot->second_photo_path) : null,
        "status" => $this->pivot->status,
        "first_attendance_time" => $this->pivot->first_attendance_time ? Carbon::createFromFormat('Y-m-d H:i:s', $this->pivot->first_attendance_time)->toDateTimeString() : null,
        "second_attendance_time" => $this->pivot->second_attendance_time ? Carbon::createFromFormat('Y-m-d H:i:s', $this->pivot->second_attendance_time)->toDateTimeString() : null,
        "verified" => $this->pivot->verified,
      ],
    ];
  }
}
