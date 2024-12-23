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
        // Pendaftar Lomba
        Schema::create('competition_registrants', function (Blueprint $table) {
            $table->id(); // ID kompetisi
            $table->string('ormawa_delegation')->nullable(); // Delegasi ORMAWA
            $table->string('activity_name'); // Nama kegiatan
            $table->string('scope')->nullable(); // Tingkat Prestasi lomba
            $table->string('field')->nullable(); // Bidang lomba
            $table->string('mentor_name')->nullable(); // Nama pembimbing
            $table->string('organizer')->nullable(); // Penyelenggara
            $table->string('host_country')->nullable(); // Negara penyelenggara
            $table->string('location')->nullable(); // Lokasi kegiatan
            $table->date('activity_date_start')->nullable(); // Tanggal mulai
            $table->date('activity_date_end')->nullable(); // Tanggal selesai
            $table->text('description')->nullable(); // Deskripsi kegiatan
            $table->string('poster_url')->nullable(); // URL poster
            $table->timestamps();
        });
        
        Schema::create('mahasiswa_competition_registrants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_mahasiswa')->constrained('mahasiswas')->onDelete('cascade');
            $table->foreignId('id_competition_registrant')->constrained('competition_registrants')->onDelete('cascade'); // Pastikan kolom ini ada
            $table->boolean('is_leader')->default(false);
            $table->timestamps();
        });        

        // Pemenang Lomba
        Schema::create('competition_achievements', function (Blueprint $table) {
            $table->id(); // ID kompetisi
            $table->string('ormawa_delegation')->nullable(); // Delegasi ORMAWA
            $table->string('activity_name'); // Nama kegiatan
            $table->string('scope')->nullable(); // Tingkat Prestasi lomba
            $table->string('field')->nullable(); // Bidang lomba
            $table->string('mentor_name')->nullable(); // Nama pembimbing
            $table->string('organizer')->nullable(); // Penyelenggara
            $table->string('host_country')->nullable(); // Negara penyelenggara
            $table->string('location')->nullable(); // Lokasi kegiatan
            $table->date('activity_date_start')->nullable(); // Tanggal mulai
            $table->date('activity_date_end')->nullable(); // Tanggal selesai
            $table->text('description')->nullable(); // Deskripsi kegiatan

            // PEMENANG LOMBA

            $table->string('degree')->nullable(); // Gelar lomba
            $table->string('proof_scan_url')->nullable(); // URL bukti scan
            $table->string('event_photo_url')->nullable(); // URL poster
            $table->timestamps();
        });
        
        Schema::create('mahasiswa_competition_achievements', function (Blueprint $table) {
            $table->id(); // ID relasi
            $table->foreignId('id_mahasiswa')->constrained('mahasiswas')->onDelete('cascade');
            $table->foreignId('id_competition_achievement')->constrained('competition_achievements')->onDelete('cascade'); // Foreign key ke competitions
            $table->timestamps();
        });    

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competition_registrants');
        Schema::dropIfExists('user_competition_registrants');
    }
};
