<?php

namespace App\Models\Abdimas;

use App\Models\Dosen;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DosenAbdimas extends Model
{
    use HasFactory;

    protected $table = 'dosen_abdimas_members';

    protected $fillable = [
        'id_dosen',
        'id_abdimas_information',
        'is_leader',
    ];

    public function dosen()
    {
        return $this->belongsTo(Dosen::class, 'id_dosen');
    }
}
