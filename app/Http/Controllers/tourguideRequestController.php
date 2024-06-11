<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\tourguide;

class tourguideRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = tourguide::where('status', 'deactive')->get();
        foreach ($data as $item) {
            $item->image = asset($item->image);
            $item->passpord = asset($item->passpord);

        }
        return Inertia::render('TourGuide/TourGuideRequest', ['data' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('TourGuide/AddTourGuide');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // $data = Hotel::where('id',$id)->get();
        // return Inertia::render('Hotel/HotelView', [
        //     'data' => $data,
        // ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id)
    {
        $tourguide = tourguide::find($id);
        $tourguide->status = 'active';
        $tourguide->save();
        return redirect()->route('tourGuideRequest');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $tourguide = tourguide::find($id);
        $tourguide->delete();
        return redirect()->route('tourGuideRequest');
    }
}
