<?php

namespace App\Models\Scholarships;

use App\Models\Country;
use App\Models\Mahasiswa;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScholarshipRegistrant extends Model
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
        'poster_url',
        'phone'
    ];

    public function mahasiswa()
    {
        return $this->hasOneThrough(Mahasiswa::class, MahasiswaRegistrant::class, 'id_scholarship_registrant', 'id', null,'id_mahasiswa');
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'id_country');
    }

    public function participants()
    {
        return $this->hasMany(MahasiswaRegistrant::class, 'id_scholarship_registrant');
    }

    public function getExistAttribute()
    {
        return ScholarshipRecipient::where('name', $this->name)->exists();
    }

    protected $appends = ['exist'];
}
