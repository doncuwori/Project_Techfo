<?php

namespace App\Models\Pivot;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCompetitionAchievements extends Model
{
    use HasFactory;
    protected $table = 'user_competition_achievements';

    protected $fillable = [
        'user_id',
        'competition_achievement_id',
        'created_at',
        'updated_at',
    ];

}
