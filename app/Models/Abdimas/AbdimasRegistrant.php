<?php

namespace App\Models\Abdimas;

use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbdimasRegistrant extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_abdimas_information',
        'telephone',
        'khs',
        'cv',
        'portofolio',
        'foto',
    ];

    /**
     * Relasi dengan tabel users melalui tabel pivot user_abdimas_registrants.
     */
    public function mahasiswa()
    {
        return $this->hasManyThrough(Mahasiswa::class, MahasiswaRegistrant::class, 'id_abdimas_registrant', 'id', null,'id_mahasiswa');
    }

    public function abdimasInformation()
    {
        return $this->belongsTo(AbdimasInformation::class, 'id_abdimas_information');
    }
}
