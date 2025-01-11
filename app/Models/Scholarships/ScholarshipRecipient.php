<?php

namespace App\Models\Scholarships;

use App\Models\Country;
use App\Models\Mahasiswa;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScholarshipRecipient extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_country',
        'name',
        'type',
        'organizer',
        'host_country',
        'event_date_start',
        'event_date_end',
        'description',
        'proof_scan_url',
        'poster_url',
        'phone',
        'is_validated'
    ];

    public function mahasiswa()
    {
        return $this->hasOneThrough(Mahasiswa::class, MahasiswaRecipient::class, 'id_scholarship_recipient', 'id', null,'id_mahasiswa');
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'id_country');
    }
}
