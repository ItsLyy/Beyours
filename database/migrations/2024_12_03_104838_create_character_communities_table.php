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
        Schema::create('character_communities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('character_id')->constrained(table: 'characters', indexName: 'character_community_id');
            $table->foreignId('community_id')->constrained(table: 'communitys', indexName: 'community_joined_id');
            $table->string('role');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('character_communities');
    }
};
