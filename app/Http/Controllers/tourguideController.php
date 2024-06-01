<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\tourguide;

class tourguideController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = tourguide::where('status', 'active')->get();
        return Inertia::render('TourGuide/TourGuideList', [
            'data' => $data
        ]);
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
        $tourguide = new tourguide();
        $tourguide->name = $request->name;
        $tourguide->father_name = $request->father_name;
        $tourguide->image = $request->image;
        $tourguide->passpord = $request->passpord;
        $tourguide->id_card = $request->id_card;
        $tourguide->location = $request->location;
        $tourguide->bio = $request->bio;
        $tourguide->phone = $request->phone;
        $tourguide->status = $request->status;
        $tourguide->save();

        return redirect()->back();
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
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $hotel = tourguide::find($id);
        $hotel->delete();
        $data = tourguide::where('status', 'active')->get();
        return Inertia::render('TourGuide/TourGuideList', [
            'data' => $data
        ]);
    }
}
