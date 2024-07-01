<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShareUserData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            Inertia::share([
                'user' => [
                    'id' => Auth::user()->id,
                    'name' => Auth::user()->name,
                    'roles' => Auth::user()->getRoleNames(),
                    'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
                ],
            ]);
        }

        return $next($request);
    }
}
