<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\foot_category;
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
        foreach ($data as $item) {
            $item->passport = asset($item->passport);
            $item->image = asset($item->image);
        }
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
            'photoAddress' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'status' => 'string',

        ]);
        $photoAddressPath = null;
        if ($request->hasFile('photoAddress')) {
            try {
                $file = $request->file('photoAddress');
                $destinationPath = public_path('storage/photoAddress');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $file->move($destinationPath, $fileName);
                if (!file_exists($destinationPath . '/' . $fileName)) {
                    return Redirect::back()->with('error', 'Failed to save passport. Please try again.');
                }
                $photoAddressPath = 'storage/photoAddress/' . $fileName;
            } catch (\Exception $e) {
                return Redirect::back()->with('error', 'An error occurred while uploading the passport: ' . $e->getMessage());
            }
        } else {
            return Redirect::back()->with('error', 'No passport file found in the request.');
        }

        $hotel = new Hotel();
        $hotel->name = $request->name;
        $hotel->address = $request->address;
        $hotel->province = $request->province;
        $hotel->photoAddress = $photoAddressPath;
        $hotel->status = $request->status;
        $hotel->save();

        return redirect::back()->with('message', 'Hotel request has been sent successfully');

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



    /////////////////////////////////////////////////////////////////////////////////////////
// Food Parts

    public function indexFootCategory()
    {
        $data = foot_category::all();

        return Inertia::render('Hotel/FoodCategories', [
            'data' => $data,
        ]);
    }
    public function createFootCategory()
    {
        return Inertia::render('Hotel/AddFootCategory');
    }
    public function storeFootCategory(Request $request)
    {
        $cat_food = new foot_category();
        $cat_food->name = $request->name;
        $cat_food->description = $request->description;
        $cat_food->save();
        return Inertia::render('Hotel/AddFootCategory');
    }
    public function deleteFoodCategory($id)
    {
        $cat_food = foot_category::find($id);
        $cat_food->delete();
        return redirect()->route('footCategories');

    }


    // Food Parts
    public function createAddFood($id)
    {
        return Inertia::render('Hotel/AddFood', ['HotelID' => $id]);
    }
}
