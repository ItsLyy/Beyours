<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberAttendanceResource extends JsonResource
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
      "attendance_id" => $this->attendance->attendance_id,
      "character_id" => $this->attendance->character_id,
      "fullname" => $this->fullname,
      "profession" => $this->profession,
      "photo_profile" => $this->user->photo_profile,
      "first_photo_path" => $this->attendance->first_photo_path,
      "second_photo_path" => $this->attendance->second_photo_path,
      "verified" => $this->attendance->verified,
      "status" => $this->attendance->status,
      "created_at" => Carbon::createFromFormat('Y-m-d H:i:s', $this->attendance->created_at)->toDateTimeString(),
      "updated_at" => Carbon::createFromFormat('Y-m-d H:i:s', $this->attendance->updated_at)->toDateTimeString(),
    ];
  }
}
