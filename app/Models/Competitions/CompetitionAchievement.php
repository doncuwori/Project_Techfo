<?php

namespace App\Models\Competitions;

use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompetitionAchievement extends Model
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
        'achievement_level',
        'proof_scan_url',
        'event_photo_url',
    ];

    public function mahasiswa()
    {
        return $this->hasManyThrough(Mahasiswa::class, MahasiswaAchievement::class, 'id_competition_achievement', 'id');
    }
}
