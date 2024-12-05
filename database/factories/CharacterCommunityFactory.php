<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CharacterCommunity>
 */
class CharacterCommunityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
      return [
        "character_id" => 1,
        "description" => fake()->text(),
        "useAttendance" => false,
        "banner_path" => "0",
      ];
    }
}
