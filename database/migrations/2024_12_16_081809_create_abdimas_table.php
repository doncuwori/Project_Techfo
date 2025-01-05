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
        Schema::create('abdimas_registrants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_abdimas_information')->constrained('abdimas_information')->onDelete('cascade');
            $table->string('telephone');
            $table->string('khs');
            $table->string('cv');
            $table->string('portofolio');
            $table->string('foto');
            // $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });

        Schema::create('mahasiswa_abdimas_registrants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_mahasiswa')->constrained('mahasiswas')->onDelete('cascade');
            $table->foreignId('id_abdimas_registrant')->constrained('abdimas_registrants')->onDelete('cascade');
            $table->boolean('accepted')->default(false);
            $table->boolean('rejected')->default(false);
            $table->timestamps();
        });

        // Schema::create('abdimas_recipients', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('name');
        //     $table->string('telephone');
        //     $table->string('organizer');
        //     $table->string('khs');
        //     $table->string('cv');
        //     $table->string('portofolio');
        //     $table->string('foto');
        //     $table->foreignId('created_by')->constrained('users');
        //     $table->timestamps();
        // });

        // Schema::create('mahasiswa_abdimas_recipients', function (Blueprint $table) {
        //     $table->id();
        //     $table->foreignId('id_mahasiswa')->constrained('mahasiswas')->onDelete('cascade');
        //     $table->foreignId('id_abdimas_recipient')->constrained('abdimas_recipients')->onDelete('cascade');
        //     $table->timestamps();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       //
    }
};
