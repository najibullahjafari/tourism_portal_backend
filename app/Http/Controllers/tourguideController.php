<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\tourguide;
use App\Models\User;
use App\Models\like;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;

class tourguideController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->has("category") && $request->has("q")) {
            $col = $request->category;
            $val = $request->q;
            $data = User::where('status', 'active')->where($col, 'like', '%' . $val . '%')->get();
            foreach ($data as $item) {
                $item->image = asset($item->image);
                $item->passport = asset($item->passport);

            }
            return Inertia::render('TourGuide/TourGuideList', [
                'data' => $data
            ]);
        } else {

            $data = User::where('status', 'active')->get();
            foreach ($data as $item) {
                $item->image = asset($item->image);
                $item->passport = asset($item->passport);

            }
            return Inertia::render('TourGuide/TourGuideList', [
                'data' => $data
            ]);
        }
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
        $passportPath = null;
        $previousPath = false;
        $imagePath = null;
        $previousImagePath = false;
        if ($request->hasFile('passport')) {
            try {
                $file = $request->file('passport');
                $destinationPath = public_path('storage/passport');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $file->move($destinationPath, $fileName);
                if (!file_exists($destinationPath . '/' . $fileName)) {
                    $previousPath = true;
                }
                $passportPath = 'storage/passport/' . $fileName;
            } catch (\Exception $e) {
                return Redirect::back()->with('error', 'An error occurred while uploading the passport: ' . $e->getMessage());
            }
        } else {
            return Redirect::back()->with('error', 'No passport file found in the request.');
        }
        if ($request->hasFile('image')) {
            try {
                $file = $request->file('image');
                $destinationPath = public_path('storage/tourGuideImage');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $file->move($destinationPath, $fileName);
                if (!file_exists($destinationPath . '/' . $fileName)) {
                    $previousImagePath = true;
                }
                $imagePath = 'storage/tourGuideImage/' . $fileName;
            } catch (\Exception $e) {
                return Redirect::back()->with('error', 'An error occurred while uploading the passport: ' . $e->getMessage());
            }
        } else {
            return Redirect::back()->with('error', 'No passport file found in the request.');
        }
        $user = new User();
        $user->name = $request->name;
        $user->father_name = $request->father_name;
        $user->image = $imagePath;
        $user->passport = $passportPath;
        $user->id_card = $request->id_card;
        $user->location = $request->location;
        $user->bio = $request->bio;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->userType = $request->userType;
        $user->status = $request->status;
        $user->save();

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
    public function edit($id)
    {
        $user = User::where('id', $id)->get();
        foreach ($user as $item) {
            $item->image = asset($item->image);
            $item->passport = asset($item->passport);
        }
        return Inertia::render('TourGuide/TourGuideProfile', [
            'tour' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        return Inertia::render('TourGuide/AddTourGuide');
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
    public function view()
    {
        $data = User::where('status', 'active')->get();

        foreach ($data as $item) {
            $item->image = asset($item->image);
            $item->liked = like::where('type', "tourGuide")->where('obj_id', $item->id)->get()->count();

        }
        return Inertia::render('TourGuide/TourGuides', [
            'data' => $data,
        ]);
    }
    public function viewDetial($id)
    {
        $data = tourguide::where('id', $id)->get();

        foreach ($data as $item) {
            $item->image = asset($item->image);
            $item->liked = like::where('type', "tourGuide")->where('obj_id', $item->id)->get()->count();

        }
        return Inertia::render('TourGuide/TourGuideDetial', [
            'data' => $data,
        ]);
    }

    // Tourist View and Like
    public function viewTourist()
    {
        $data = tourguide::where('status', 'active')->where('userType', 'tourist')->get();

        foreach ($data as $item) {
            $item->image = asset($item->image);
            $item->liked = like::where('type', "tourist")->where('obj_id', $item->id)->get()->count();

        }
        return Inertia::render('TourGuide/Tourists', [
            'data' => $data,
        ]);
    }
    public function touristDetial($id)
    {
        $data = tourguide::where('id', $id)->get();

        foreach ($data as $item) {
            $item->image = asset($item->image);
            $item->liked = like::where('type', "tourist")->where('obj_id', $item->id)->get()->count();

        }
        return Inertia::render('TourGuide/TouristDetial', [
            'data' => $data,
        ]);
    }
}
