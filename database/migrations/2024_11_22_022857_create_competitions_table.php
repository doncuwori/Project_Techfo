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
            $table->foreignId('id_country')->constrained('countries')->onDelete('cascade');
            $table->foreignId('id_dosen')->constrained('dosens')->onDelete('cascade');
            $table->string('ormawa_delegation'); // Delegasi ORMAWA
            $table->string('activity_name'); // Nama kegiatan
            $table->string('scope'); // Tingkat Prestasi lomba
            $table->string('field'); // Bidang lomba
            $table->string('type'); // Jenis lomba
            $table->string('organizer'); // Penyelenggara
            $table->string('location'); // Lokasi kegiatan
            $table->date('activity_date_start'); // Tanggal mulai
            $table->date('activity_date_end'); // Tanggal selesai
            $table->text('description'); // Deskripsi kegiatan
            $table->string('poster_url'); // URL poster
            $table->string('phone'); 
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
            $table->foreignId('id_country')->constrained('countries')->onDelete('cascade');
            $table->foreignId('id_dosen')->constrained('dosens')->onDelete('cascade');
            $table->string('ormawa_delegation'); // Delegasi ORMAWA
            $table->string('activity_name'); // Nama kegiatan
            $table->string('scope'); // Tingkat Prestasi lomba
            $table->string('field'); // Bidang lomba
            $table->string('type'); // Jenis lomba
            $table->string('organizer'); // Penyelenggara
            $table->string('location'); // Lokasi kegiatan
            $table->date('activity_date_start'); // Tanggal mulai
            $table->date('activity_date_end'); // Tanggal selesai
            $table->text('description'); // Deskripsi kegiatan
            $table->string('phone'); 

            // PEMENANG LOMBA

            $table->string('degree'); // Gelar lomba
            $table->string('report_url'); // Gelar lomba
            $table->string('proof_scan_url'); // URL bukti scan
            $table->string('event_photo_url'); // URL poster

            // VALIDATION
            $table->boolean('is_validated')->default(false);
            $table->timestamps();
        });
        
        Schema::create('mahasiswa_competition_achievements', function (Blueprint $table) {
            $table->id(); // ID relasi
            $table->foreignId('id_mahasiswa')->constrained('mahasiswas')->onDelete('cascade');
            $table->foreignId('id_competition_achievement')->constrained('competition_achievements')->onDelete('cascade'); // Foreign key ke competitions
            $table->boolean('is_leader')->default(false);
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
