<?php

namespace App\Models\Scholarships;

use App\Models\Mahasiswa;
use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MahasiswaRecipient extends Model
{
    use HasFactory;

    protected $table = 'mahasiswa_scholarship_recipients';

    protected $fillable = [
        'id_mahasiswa',
        'id_scholarship_recipient',
    ];

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'id_mahasiswa');
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'id_country');
    }

    public function scholarshipRecipient()
    {
        return $this->belongsTo(ScholarshipRecipient::class, 'id_scholarship_recipient');
    }
}
