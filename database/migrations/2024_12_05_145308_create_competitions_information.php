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
        Schema::create('competitions_information', function (Blueprint $table) {
            $table->id(); 
            $table->string('name'); 
            $table->string('organizer'); 
            $table->dateTime('event_time_start'); 
            $table->dateTime('event_time_end'); 
            $table->text('description'); 
            $table->string('activity_link'); 
            $table->string('guidebook_link'); 
            $table->string('poster_url')->nullable(); 
            $table->foreignId( 'created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
