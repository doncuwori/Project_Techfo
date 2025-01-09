<?php

namespace App\Models\Abdimas;

use App\Models\Dosen;
use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class AbdimasInformation extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'created_by',
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

    public function getLeaderAttribute()
    {
        return DosenAbdimas::where('id_abdimas_information', $this->id)->where('is_leader', true)->with('dosen')->first();
    }

    public function abdimasRegistrant()
    {
        return $this->hasMany(AbdimasRegistrant::class, 'id_abdimas_information');
    }

    public function getClosedAttribute()
    {
        return MahasiswaRegistrant::whereHas('abdimasRegistrant', function ($query) {
            $query->where('id_abdimas_information', $this->id);
        })->where('accepted', true)->count();
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getExistEnrollAttribute()
    {
        if(Gate::check('mahasiswa')){
            $mahasiswa = Mahasiswa::where('id_user', Auth::user()->id)->first();

            $registrant = MahasiswaRegistrant::where('id_mahasiswa', $mahasiswa->id)->with('abdimasRegistrant')->get();

            foreach($registrant as $r){
                if($r->accepted == false && $r->rejected == false){
                    return true;
                }
                return false;
            }
        }else{
            return false;
        }
    }

    public function getAlreadyEnrollAttribute()
    {
        if(Gate::check('mahasiswa')){
            $mahasiswa = Mahasiswa::where('id_user', Auth::user()->id)->first();

            return MahasiswaRegistrant::where('id_mahasiswa', $mahasiswa->id)
            ->whereHas('abdimasRegistrant', function ($query) { 
                $query->where('id_abdimas_information', $this->id); 
            })->with('abdimasRegistrant')->exists();

        }else{
            return false;
        }
    }

    protected $appends = ['leader', 'closed', 'exist_enroll', 'already_enroll'];
}