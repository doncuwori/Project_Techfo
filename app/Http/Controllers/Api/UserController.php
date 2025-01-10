<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->has('name')) {
            $name = strtolower($request->name);
            $query->whereRaw('LOWER(name) LIKE ?', ["%{$name}%"]);
        }

        if ($request->has('nim')) {
            $nim = $request->nim;
            $query->where('nim', 'LIKE', "%{$nim}%");
        }

        $query->where('role', 'user');

        $users = $query->limit(5)->get();

        $mappedUsers = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'nim' => $user->nim,
                'name' => $user->name,

            ];
        });

        return response()->json(["data" => $mappedUsers]);
    }
}
