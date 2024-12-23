<?php

namespace App\Models\Competitions;

use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompetitionRegistrant extends Model
{
    use HasFactory;

    protected $fillable = [
        'scope',
        'degree',
        'ormawa_delegation',
        'mentor_name',
        'activity_name',
        'field',
        'organizer',
        'host_country',
        'location',
        'activity_date_start',
        'activity_date_end',
        'description',
        'poster_url',
    ];
    public function mahasiswa()
    {
        return $this->hasManyThrough(Mahasiswa::class, MahasiswaRegistrant::class, 'id_competition_registrant', 'id');
    }
}
