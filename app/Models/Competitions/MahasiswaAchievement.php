<?php

namespace App\Models\Competitions;

use App\Models\Mahasiswa;
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

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'id_mahasiswa');
    }

    public function getIsGroupAttribute()
    {
        $count = MahasiswaAchievement::where('id_competition_achievement', $this->id_competition_achievement)->count();

        if($count == 1){
            return false;
        }else{
            return true;
        }
    }
    protected $appends = ['is_group'];

    public function competitionAchievement()
    {
        return $this->belongsTo(CompetitionAchievement::class, 'id_competition_achievement');
    }
}
