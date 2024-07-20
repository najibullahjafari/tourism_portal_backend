<?php

namespace App\Http\Controllers;

use App\Models\sight_seeing;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Models\Hotel;
use App\Models\User;

class Welcome extends Controller
{
    //
    public function hotel(Request $request)
    {
        $data = Hotel::where('status', 'active');
        if ($request->has('q')) {
            $search = $request->q;
            $data = $data->where('name', 'like', '%' . $search . '%')->orwhere('province', 'like', '%' . $search . '%');
        }
        $data = $data->get();
        foreach ($data as $item) {
            $item->photoAddress = asset($item->photoAddress);

        }
        return Inertia::render('Hotel', [
            'data' => $data,
            // 'canLogin' => Route::has('login'),
            // 'canRegister' => Route::has('register'),
            // 'laravelVersion' => Application::VERSION,
            // 'phpVersion' => PHP_VERSION,
        ]);


    }
    public function sightSeeing(Request $request)
    {
        $data = sight_seeing::where('status', 'active');

        if ($request->has('q')) {
            $search = $request->q;
            $data = $data->where('name', 'like', '%' . $search . '%')->orwhere('description', 'like', '%' . $search . '%');
        }
        $data = $data->get();
        foreach ($data as $item) {
            $item->image = asset($item->image);

        }
        return Inertia::render('SightSeeing', [
            'data' => $data,
            // 'canLogin' => Route::has('login'),
            // 'canRegister' => Route::has('register'),
            // 'laravelVersion' => Application::VERSION,
            // 'phpVersion' => PHP_VERSION,
        ]);


    }

    public function tourGuide(Request $request)
    {
        $data = User::where('status', 'active')->where('userType', 'tourguide');
        if ($request->has('q')) {
            $search = $request->q;
            $data = $data->where('name', 'like', '%' . $search . '%')->orwhere('bio', 'like', '%' . $search . '%');
        }
        $data = $data->get();
        foreach ($data as $item) {
            $item->image = asset($item->image);

        }
        return Inertia::render('TourGuide', [
            'data' => $data,
            // 'canLogin' => Route::has('login'),
            // 'canRegister' => Route::has('register'),
            // 'laravelVersion' => Application::VERSION,
            // 'phpVersion' => PHP_VERSION,
        ]);


    }
}
