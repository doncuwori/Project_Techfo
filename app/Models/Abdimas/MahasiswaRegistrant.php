<?php

namespace App\Models\Abdimas;

use App\Models\Mahasiswa;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MahasiswaRegistrant extends Model
{
    use HasFactory;
    protected $table = 'mahasiswa_abdimas_registrants';

    protected $fillable = [
        'id_mahasiswa',
        'id_abdimas_registrant',
        'accepted',
        'rejected'
    ];


    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'id_mahasiswa');
    }

    public function abdimasRegistrant()
    {
        return $this->belongsTo(AbdimasRegistrant::class, 'id_abdimas_registrant');
    }
}
