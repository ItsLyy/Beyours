<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceReportResource extends JsonResource
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
      "created_at" => Carbon::parse($this->created_at)->format('d F Y'),
      "updated_at" => Carbon::parse($this->created_at)->format('d F Y'),
      "characters" => AttendanceReportMemberResource::collection(
        $this->characters
      ),
    ];
  }
}
