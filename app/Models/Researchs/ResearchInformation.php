<?php

namespace App\Models\Researchs;

use App\Models\Dosen;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchInformation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'event_time_start',
        'event_time_end',
        'location',
        'total_students_required',
        'created_by',
        'description',
    ];

    protected $table = 'researches_information';

    public function dosen()
    {
        return $this->hasManyThrough(Dosen::class, DosenResearch::class, 'id_research_information', 'id', null, 'id_dosen');
    }

    public function getLeaderAttribute()
    {
        return DosenResearch::where('id_research_information', $this->id)->where('is_leader', true)->with('dosen')->first();
    }

    public function researchRegistrant()
    {
        return $this->hasMany(ResearchRegistrant::class, 'id_research_information');
    }

    protected $appends = ['leader'];
}
