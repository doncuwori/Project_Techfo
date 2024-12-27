<?php

namespace App\Models\Competitions;

use App\Models\Mahasiswa;
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

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'id_mahasiswa');
    }

    public function competitionRegistrant()
    {
        return $this->belongsTo(CompetitionRegistrant::class, 'id_competition_registrant');
    }
}
