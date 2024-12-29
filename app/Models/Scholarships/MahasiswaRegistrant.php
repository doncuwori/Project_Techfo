<?php

namespace App\Models\Scholarships;

use App\Models\Mahasiswa;
use App\Models\Scholarships\ScholarshipRegistrant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MahasiswaRegistrant extends Model
{
    protected $table = 'mahasiswa_scholarship_registrants';

    protected $fillable = [
        'id_mahasiswa',
        'id_scholarship_registrant',
    ];

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'id_mahasiswa');
    }

    public function scholarshipRegistrant()
    {
        return $this->belongsTo(ScholarshipRegistrant::class, 'id_scholarship_registrant');
    }
}
