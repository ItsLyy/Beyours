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
        Schema::create('community_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('character_id')->constrained(table: 'characters', indexName: 'member_id');
            $table->foreignId('community_id')->constrained(table: 'communitys', indexName: 'community_user_id');
            $table->string('role');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('community_users');
    }
};
