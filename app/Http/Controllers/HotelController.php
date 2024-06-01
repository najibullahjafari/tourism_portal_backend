<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;


class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Hotel::where('status', 'active')->get();
        return Inertia::render('Hotel/HotelList', [
            'data' => $data,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Hotel/AddHotel');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'province' => 'required|string',
            'photoAddress' => 'required|string',
            'status' => 'string',

        ]);


        $hotel = new Hotel();
        $hotel->name = $request->name;
        $hotel->address = $request->address;
        $hotel->province = $request->province;
        $hotel->photoAddress = $request->photoAddress;
        $hotel->status = $request->status;
        $hotel->save();

        return redirect::back()->with('message', 'Car request has been sent successfully');

    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = Hotel::where('id', $id)->get();
        return Inertia::render('Hotel/HotelView', [
            'data' => $data,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hotel $hotel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate and update the hotel data
        $hotel = Hotel::where('id', $id)->get();
        $hotel->update($request->all());

        // Redirect or return a response
        return redirect()->route('hotelList.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $hotel = Hotel::find($id);
        $hotel->delete();
        return redirect()->route('hotelList');
    }
}
