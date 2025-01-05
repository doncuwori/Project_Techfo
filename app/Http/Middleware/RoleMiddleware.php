<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle($request, Closure $next, $role)
    {
        $user = Auth::user();

        $role = str_ireplace('|', ',', $role);

        $role = explode(',', $role);

        $isOrmawa = Gate::check('ormawa');

        if ($user && (in_array($user->role, $role) || $isOrmawa)) {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }
}