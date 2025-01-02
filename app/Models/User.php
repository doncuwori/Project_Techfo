<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Competitions\CompetitionRegistrant;
use App\Models\Competitions\CompetitionAchievement;
use App\Models\Scholarships\ScholarshipRecipient;
use App\Models\Scholarships\ScholarshipRegistrant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];
    
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function mahasiswa()
    {
        return $this->hasOne(Mahasiswa::class, 'id_user');
    }

    public function dosen()
    {
        return $this->hasOne(Dosen::class, 'id_user');
    }

    // Relasi dengan Competition Registrants (pendaftar lomba)
    public function competitionRegistrants()
    {
        return $this->belongsToMany(CompetitionRegistrant::class, 'user_competition_registrants');
    }

    // Relasi dengan Scholarship Registrants (pendaftar beasiswa)
    public function scholarshipRegistrants()
    {
        return $this->belongsToMany(ScholarshipRegistrant::class, 'user_scholarship_registrants');
    }

    // Relasi dengan Competition Achievements (pemenang lomba)`
    public function competitionAchievements()
    {
        return $this->belongsToMany(CompetitionAchievement::class, 'user_competition_achievements');
    }

    // Relasi dengan Scholarship Recipients (penerima beasiswa)
    public function scholarshipRecipients()
    {
        return $this->belongsToMany(ScholarshipRecipient::class, 'user_scholarship_recipients');
    }
}
