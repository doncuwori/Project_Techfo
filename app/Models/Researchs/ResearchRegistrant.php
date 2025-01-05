<?php

namespace App\Models\Researchs;

use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchRegistrant extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_research_information',
        'telephone',
        'khs',
        'cv',
        'portofolio',
        'foto',
    ];

    /**
     * Relasi dengan tabel users melalui tabel pivot user_research_registrants.
     */
    public function mahasiswa()
    {
        return $this->hasOneThrough(Mahasiswa::class, MahasiswaRegistrant::class, 'id_research_registrant', 'id', null,'id_mahasiswa');
    }

    public function getStatusAttribute()
    {
        return MahasiswaRegistrant::where('id_research_registrant', $this->id)->first()->accepted;
    }

    public function getRejectedAttribute()
    {
        return MahasiswaRegistrant::where('id_research_registrant', $this->id)->first()->rejected;
    }

    public function researchInformation()
    {
        return $this->belongsTo(ResearchInformation::class, 'id_research_information');
    }
    
    protected $appends = ['status', 'rejected'];
}
