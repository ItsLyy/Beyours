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
        Schema::create('character_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained(table: 'tasks', indexName:'character_task_id');
            $table->foreignId('assign_to')->constrained(table: 'characters', indexName:'assign_to_id');
            $table->boolean('done')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('character_tasks');
    }
};
