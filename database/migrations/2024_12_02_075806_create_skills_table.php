<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('skills', function (Blueprint $table) {
      $table->id();
      $table->foreignId('character_id')->constrained(table: 'characters', indexName: 'skill_character_id');
      $table->string('name');
      $table->biginteger('experience');
      $table->bigInteger('level');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('skills');
  }
};
