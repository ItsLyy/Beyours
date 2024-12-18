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
    Schema::create('community_attendances', function (Blueprint $table) {
      $table->id();
      $table->foreignId('character_id')->constrained(table: 'characters', indexName: 'attendance_character_id');
      $table->foreignId('attendance_id')->constrained(table: 'attendances', indexName: 'current_attendance_id');
      $table->string('first_photo_path')->nullable();
      $table->string('second_photo_path')->nullable();
      $table->timestamp('first_attendance_time')->nullable();
      $table->timestamp('second_attendance_time')->nullable();
      $table->text('journal')->nullable();
      $table->boolean('verified')->default(false);
      $table->string('status');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('community_attendances');
  }
};
