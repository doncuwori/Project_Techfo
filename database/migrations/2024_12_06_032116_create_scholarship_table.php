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
        Schema::create('scholarship_registrants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_country')->constrained('countries')->onDelete('cascade');
            $table->string('name');
            $table->string('type');
            $table->string('organizer');
            $table->date('event_date_start');
            $table->date('event_date_end');
            $table->text('description');
            $table->string('poster_url')->nullable();
            $table->timestamps();
        });

        Schema::create('mahasiswa_scholarship_registrants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_mahasiswa')->constrained('mahasiswas')->onDelete('cascade');
            $table->foreignId('id_scholarship_registrant')->constrained('scholarship_registrants')->onDelete('cascade');
            $table->timestamps();
        });
        

        Schema::create('scholarship_recipients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_country')->constrained('countries')->onDelete('cascade');
            $table->string('name');
            $table->string('type');
            $table->string('organizer');
            $table->date('event_date_start');
            $table->date('event_date_end');
            $table->text('description');
            $table->string('proof_scan_url');
            $table->string('poster_url');
            $table->timestamps();
        });
        
        Schema::create('mahasiswa_scholarship_recipients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_mahasiswa')->constrained('mahasiswas')->onDelete('cascade');
            $table->foreignId('id_scholarship_recipient')->constrained('scholarship_recipients')->onDelete('cascade');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scholarship_registrants');
        Schema::dropIfExists('user_scholarship_registrants');
        Schema::dropIfExists('scholarship_recipients');
        Schema::dropIfExists('user_scholarship_recipients');
    }
};