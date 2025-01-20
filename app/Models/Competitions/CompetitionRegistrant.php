<?php

namespace App\Models\Competitions;

use App\Models\Country;
use App\Models\Dosen;
use App\Models\Mahasiswa;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompetitionRegistrant extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_dosen',
        'id_country',
        'scope',
        'degree',
        'ormawa_delegation',
        'activity_name',
        'field',
        'type',
        'organizer',
        'location',
        'activity_date_start',
        'activity_date_end',
        'description',
        'poster_url',
        'phone'
    ];
    
    public function mahasiswa()
    {
        return $this->hasManyThrough(Mahasiswa::class, MahasiswaRegistrant::class, 'id_competition_registrant', 'id', null,'id_mahasiswa');
    }
    public function getLeaderAttribute()
    {
        return MahasiswaRegistrant::where('id_competition_registrant', $this->id)->where('is_leader', true)->with('mahasiswa')->first();
    }

    public function dosen()
    {
        return $this->belongsTo(Dosen::class, 'id_dosen');
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'id_country');
    }

    public function participants()
    {
        return $this->hasMany(MahasiswaRegistrant::class, 'id_competition_registrant');
    }

    public function getExistAttribute()
    {
        return CompetitionAchievement::where('activity_name', $this->activity_name)->exists();
    }

    protected $appends = ['exist', 'leader'];
}
