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
    Schema::create('characters', function (Blueprint $table) {
      $table->id();
      $table->string('fullname');
      $table->biginteger('health');
      $table->biginteger('level');
      $table->double('experience');
      $table->string('profession');
      $table->string('banner_path')->nullable();
      $table->foreignId('user_id')->constrained(table: 'users', indexName: 'user_character_id');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('characters');
  }
};
