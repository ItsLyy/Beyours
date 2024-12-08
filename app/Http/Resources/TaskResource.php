<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
      $character = auth()->user()->character;
      return [
        "id" => $this->id,
        "title" => $this->title,
        "description" => $this->description,
        "due_at" => $this->due_at,
        "assignTo" => $this->assignTo->map(function ($assign) {
          return $assign;
        })->firstWhere('id', $character->id),
        "assignBy" => new CharacterResource($this->assignBy),
        "community_id" => null,
      ];
    }
}
