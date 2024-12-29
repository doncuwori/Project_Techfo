<?php

namespace App\Models\Abdimas;

use App\Models\Dosen;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbdimasInformation extends Model
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

    public function dosen()
    {
        return $this->hasManyThrough(Dosen::class, DosenAbdimas::class, 'id_abdimas_information', 'id', null, 'id_dosen');
    }
}