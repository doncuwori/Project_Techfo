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
        Schema::create('research_registrants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_research_information')->constrained('researches_information')->onDelete('cascade');
            $table->string('telephone');
            $table->string('khs');
            $table->string('cv');
            $table->string('portofolio');
            $table->string('foto');
            // $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });

        Schema::create('mahasiswa_research_registrants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_mahasiswa')->constrained('mahasiswas')->onDelete('cascade');
            $table->foreignId('id_research_registrant')->constrained('research_registrants')->onDelete('cascade');
            $table->boolean('accepted')->default(false);
            $table->boolean('rejected')->default(false);
            $table->timestamps();
        });

        // Schema::create('research_recipients', function (Blueprint $table) {
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

        // Schema::create('user_research_recipients', function (Blueprint $table) {
        //     $table->id();
        //     $table->foreignId('user_id')->constrained()->onDelete('cascade');
        //     $table->foreignId('research_recipient_id')->constrained('abdimas_recipients')->onDelete('cascade');
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
