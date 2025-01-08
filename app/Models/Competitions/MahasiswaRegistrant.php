<?php

namespace App\Models\Competitions;

use App\Models\Mahasiswa;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MahasiswaRegistrant extends Model
{
    protected $table = 'mahasiswa_competition_registrants';

    protected $fillable = [
        'id_mahasiswa',
        'id_competition_registrant',
        'is_leader',
    ];


    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'id_mahasiswa');
    }

    public function getIsGroupAttribute()
    {
        $count = MahasiswaRegistrant::where('id_competition_registrant', $this->id_competition_registrant)->count();

        if($count == 1){
            return false;
        }else{
            return true;
        }
    }
    protected $appends = ['is_group'];

    public function competitionRegistrant()
    {
        return $this->belongsTo(CompetitionRegistrant::class, 'id_competition_registrant');
    }
}
