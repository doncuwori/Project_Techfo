<?php

namespace App\Models\Competitions;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MahasiswaAchievement extends Model
{
    use HasFactory;

    protected $table = 'mahasiswa_competition_achievements';

    protected $fillable = [
        'id_mahasiswa',
        'id_competition_achievement',
        'is_leader',
    ];
}
