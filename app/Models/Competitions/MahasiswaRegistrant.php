<?php

namespace App\Models\Competitions;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MahasiswaRegistrant extends Model
{
    protected $table = 'mahasiswa_competition_registrants';

    protected $fillable = [
        'id_mahasiswa',
        'id_competition_registrant',
        'is_leader',
    ];
}
