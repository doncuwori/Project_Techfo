<?php

namespace App\Models\Researchs;

use App\Models\Mahasiswa;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MahasiswaRegistrant extends Model
{
    use HasFactory;

    protected $table = 'mahasiswa_research_registrants';

    protected $fillable = [
        'id_mahasiswa',
        'id_research_registrant',
        'accepted',
        'rejected'
    ];


    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'id_mahasiswa');
    }

    public function researchRegistrant()
    {
        return $this->belongsTo(ResearchRegistrant::class, 'id_research_registrant');
    }
}
