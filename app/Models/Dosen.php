<?php

namespace App\Models;

use App\Models\Competitions\CompetitionRegistrant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'id_prodi',
        'nidn',
        'nama',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function prodi()
    {
        return $this->belongsTo(Prodi::class, 'id_prodi');
    }

    public function dosenAccess()
    {
        return $this->hasMany(DosenAccess::class, 'id_dosen');
    }

    public function getMaxDosenCompetitionAttribute()
    {
        $count = CompetitionRegistrant::where('id_dosen', $this->id)->count();

        return $count;
    }

    protected $appends = [
        'max_dosen_competition',
    ];
}
