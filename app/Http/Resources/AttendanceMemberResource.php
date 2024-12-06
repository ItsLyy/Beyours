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
    $user = User::find($this->user_id);
    return [
      "id" => $this->id,
      "fullname" => "Irly Fizaharis",
      "profession" => "Programmer",
      "created_at" => (new Carbon($this->pivot->created_at))->toDayDateTimeString(),
      "updated_at" => (new Carbon($this->pivot->updated_at))->toDayDateTimeString(),
      "first_photo_path" => $this->pivot->first_photo_path,
      "second_photo_path" => $this->pivot->second_photo_path,
      "attendance_id" => $this->pivot->attendance_id,
      "journal" => $this->pivot->journal,
      "status" => $this->pivot->status,
      "verified" => $this->pivot->verified,
      "user" => $user,
    ];
  }
}
