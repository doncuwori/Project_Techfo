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
        Schema::create('abdimas_information', function (Blueprint $table) {
            $table->id(); 
            $table->string('name'); 
            $table->text('description'); 
            $table->dateTime('event_time_start'); 
            $table->dateTime('event_time_end'); 
            $table->string('location'); 
            $table->integer('total_students_required'); 
            $table->text('surat_tugas')->nullable();
            // $table->string("assignment_letter_url");
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');

            // FUNDING
            $table->enum('funding', ['Hibah Instansi Pemerintah', 'Hibah Instansi Swasta', 'Mandiri']);
            $table->timestamps(); 
        });

        Schema::create('dosen_abdimas_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_dosen')->constrained('dosens')->onDelete('cascade');
            $table->foreignId('id_abdimas_information')->constrained('abdimas_information')->onDelete('cascade');
            $table->boolean('is_leader')->default(false);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abdimas_information');
    }
};