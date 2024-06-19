<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\foot_category;
use App\Models\foot;
use App\Models\room;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;


class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->has("category") && $request->has("q")) {
            $col = $request->category;
            $val = $request->q;
            $data = Hotel::where('status', 'active')->where($col, 'like', '%' . $val . '%')->get();
            foreach ($data as $item) {
                $item->photoAddress = asset($item->photoAddress);

            }
            return Inertia::render('Hotel/HotelList', [
                'data' => $data,
            ]);

        } else {


            $data = Hotel::where('status', 'active')->get();
            foreach ($data as $item) {
                $item->photoAddress = asset($item->photoAddress);

            }
            return Inertia::render('Hotel/HotelList', [
                'data' => $data,
            ]);
        }
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
    public function viewHotel($id, Request $request)
    {
        if ($request->has('name') && $request->has('address') && $request->has('province')) {
            $hotel = Hotel::findOrFail($id);
            $hotel->name = $request->name;
            $hotel->address = $request->address;
            $hotel->province = $request->province;
            $hotel->save();

        }
        if ($request->has('cost') && $request->has('room_number') && $request->has('capacity')) {
            $room = room::findOrFail($request->id);
            $room->cost = $request->cost;
            $room->room_number = $request->room_number;
            $room->capacity = $request->capacity;
            $room->save();

        }
        if ($request->has('name') && $request->has('description') && $request->has('cost')) {
            $food = foot::findOrFail($request->id);
            $food->cost = $request->cost;
            $food->name = $request->name;
            $food->description = $request->description;
            $food->save();

        }
        $hotel = Hotel::where('id', $id)->get();
        $rooms = room::where('hotel_id', $id)->get();
        $foods = foot::where('hotel_id', $id)->get();

        $hotel[0]->photoAddress = asset($hotel[0]->photoAddress);

        foreach ($foods as $item) {
            $item->image = asset($item->image);
        }
        return Inertia::render('Hotel/HotelAdmin', [
            'hotel' => $hotel,
            'rooms' => $rooms,
            'foods' => $foods
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
        $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'province' => 'required|string',
            'photoAddress' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'status' => 'string',

        ]);
        $photoAddressPath = null;
        $previousPath = false;
        if ($request->hasFile('photoAddress')) {
            try {
                $file = $request->file('photoAddress');
                $destinationPath = public_path('storage/photoAddress');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $file->move($destinationPath, $fileName);
                if (!file_exists($destinationPath . '/' . $fileName)) {
                    $previousPath = true;
                }
                $photoAddressPath = 'storage/photoAddress/' . $fileName;
            } catch (\Exception $e) {
                return Redirect::back()->with('error', 'An error occurred while uploading the passport: ' . $e->getMessage());
            }
        } else {
            return Redirect::back()->with('error', 'No passport file found in the request.');
        }

        $hotel = Hotel::where('id', $id)->get();
        $hotel->name = $request->name;
        $hotel->address = $request->address;
        $hotel->province = $request->province;
        if ($previousPath == false) {

            $hotel->photoAddress = $photoAddressPath;
        }
        $hotel->save();

        return redirect::back()->with('message', 'Hotel request has been sent successfully');

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

    public function indexFootCategory(Request $request)
    {
        $data = null;
        if ($request->has('category') && $request->has('q')) {
            $col = $request->category;
            $row = $request->q;
            $data = foot_category::where($col, 'like', '%' . $row . '%')->get();
        } else {
            $data = foot_category::all();
        }

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
    public function createAddFood()
    {
        $categories = foot_category::all();
        $hotels = Hotel::all();

        return Inertia::render('Hotel/AddFood', ['categories' => $categories, 'hotels' => $hotels]);
    }
    public function AddFood(Request $request)
    {

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $imagePath = null;
        if ($request->hasFile('image')) {
            try {
                $file = $request->file('image');
                $destinationPath = public_path('storage/image');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $file->move($destinationPath, $fileName);
                if (!file_exists($destinationPath . '/' . $fileName)) {
                    return Redirect::back()->with('error', 'Failed to save passport. Please try again.');
                }
                $imagePath = 'storage/image/' . $fileName;
            } catch (\Exception $e) {
                return Redirect::back()->with('error', 'An error occurred while uploading the passport: ' . $e->getMessage());
            }
        } else {
            return Redirect::back()->with('error', 'No passport file found in the request.');
        }
        $food = new foot();
        $food->name = $request->name;
        $food->image = $imagePath;
        $food->description = $request->description;
        $food->hotel_id = $request->hotel_id;
        $food->category_id = $request->category_id;
        $food->cost = $request->cost;
        $food->save();
        return Redirect::back()->with('Success');


    }



    // Add Hotel Room
    public function createRoom()
    {
        $hotels = Hotel::all();
        return Inertia::render('Hotel/AddRoom', ['hotels' => $hotels]);
    }
    public function storeRoom(Request $request)
    {
        $room = new room();
        $room->capacity = $request->capacity;
        $room->cost = $request->cost;
        $room->room_number = $request->room_number;
        $room->hotel_id = $request->hotel_id;
        $room->save();
        return Redirect::back();
    }
}
