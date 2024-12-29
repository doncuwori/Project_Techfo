<?php

namespace App\Models\Researchs;

use App\Models\Dosen;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DosenResearch extends Model
{
    use HasFactory;

    protected $table = 'dosen_research_members';

    protected $fillable = [
        'id_dosen',
        'id_research_information',
        'is_leader',
    ];

    public function dosen()
    {
        return $this->belongsTo(Dosen::class, 'id_dosen');
    }
}
