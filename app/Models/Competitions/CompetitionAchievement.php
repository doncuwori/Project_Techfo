<?php

namespace App\Models\Competitions;

use App\Models\Country;
use App\Models\Dosen;
use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompetitionAchievement extends Model
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
        'achievement_level',
        'proof_scan_url',
        'event_photo_url',
        'report_url',
        'phone',
        'is_validated'
    ];

    public function mahasiswa()
    {
        return $this->hasManyThrough(Mahasiswa::class, MahasiswaAchievement::class, 'id_competition_achievement', 'id',null,'id_mahasiswa');
    }

    public function getLeaderAttribute()
    {
        return MahasiswaAchievement::where('id_competition_achievement', $this->id)->where('is_leader', true)->with('mahasiswa')->first();
    }

    protected $appends = ['leader'];
    
    public function dosen()
    {
        return $this->belongsTo(Dosen::class, 'id_dosen');
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'id_country');
    }
}
