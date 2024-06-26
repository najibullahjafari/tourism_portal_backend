<?php

namespace App\Http\Controllers;


use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HotelRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->has("category") && $request->has("q")) {
            $col = $request->category;
            $val = $request->q;
            $data = Hotel::where('status', 'deactive')->where($col, 'like', '%' . $val . '%')->get();
            foreach ($data as $item) {
                $item->photoAddress = asset($item->photoAddress);

            }
            return Inertia::render('Hotel/HotelRequest', [
                'data' => $data,
            ]);

        } else {


            $data = Hotel::where('status', 'deactive')->get();
            foreach ($data as $item) {
                $item->photoAddress = asset($item->photoAddress);

            }
            return Inertia::render('Hotel/HotelRequest', [
                'data' => $data,
            ]);
        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(Hotel $hotel)
    {
        //
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
    public function update($id)
    {
        $hotel = Hotel::find($id);
        $hotel->status = 'active';
        $hotel->save();
        return redirect()->route('hotelRequest');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $hotel = Hotel::find($id);
        $hotel->delete();
        return redirect()->route('hotelRequest');
    }
}
