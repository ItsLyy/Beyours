<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Character>
 */
class CharacterFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'fullname' => fake()->name(),
      'health' => fake()->randomDigit(),
      'level' => fake()->randomDigit(),
      'experience' => fake()->randomDigit(),
      'profession' => fake()->text(),
      'user_id' => User::factory(),
    ];
  }
}
