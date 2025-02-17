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
        Schema::create('mahasiswa_accesses', function (Blueprint $table) {
            $table->id();
            $table->string('nama_akses');
            $table->string('instansi');
            $table->foreignId('id_mahasiswa')->constrained('mahasiswas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mahasiswa_accesses');
    }
};
