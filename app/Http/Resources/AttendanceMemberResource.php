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
        "first_photo_path" => $this->pivot->fist_photo_path,
        "second_photo_path" => $this->pivot->second_photo_path,
        "status" => $this->pivot->status,
        "created_at" => Carbon::createFromFormat('Y-m-d H:i:s', $this->pivot->created_at)->toDateTimeString(),
        "updated_at" => Carbon::createFromFormat('Y-m-d H:i:s', $this->pivot->updated_at)->toDateTimeString(),
        "verified" => $this->pivot->verified,
      ],
    ];
  }
}
