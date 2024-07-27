<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\tourguide;
use App\Models\User;
use App\Models\like;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

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
            return Inertia::render('User/UserList', [
                'data' => $data
            ]);
        } else {

            $data = User::where('status', 'active')->get();
            foreach ($data as $item) {
                $item->image = asset($item->image);
                $item->passport = asset($item->passport);

            }
            return Inertia::render('User/UserList', [
                'data' => $data
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('User/AddUser');
    }
    public function sighnUser()
    {
        return Inertia::render('User/SighnUser');
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
        // Assign role based on userType
        switch ($user->userType) {
            case 'tourguide':
                $user->assignRole('tour-guide');
                break;
            case 'superadmin':
                $user->assignRole('super-admin');
                break;
            case 'tourist':
                $user->assignRole('tourist');
                break;
            case 'hoteladmin':
                $user->assignRole('hotel-admin');
                break;
            case 'admin':
                $user->assignRole('admin');
                break;
            case 'transportadmin':
                $user->assignRole('transport-admin');
                break;
            default:
                // Optionally handle unknown userType
                $user->assignRole('user');
                break;
        }

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
        return Inertia::render('User/UserProfile', [
            'tour' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Log the request data


        // Validation rules
        // $request = $request->validate([
        //     'name' => 'required|string|max:255',
        //     'father_name' => 'required|string|max:255',
        //     'id_card' => 'required|string|max:255',
        //     'location' => 'required|string|max:255',
        //     'phone' => 'required|string|max:255',
        //     'email' => 'required|string|email|max:255',
        //     'password' => 'nullable|string|min:8',
        //     'bio' => 'required|string',
        //     'userType' => 'required|string',
        //     'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        //     'passport' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        // ]);

        // Find the user by ID
        $user = User::find($request->user()->id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Update user details
        $user->name = $request['name'];
        $user->father_name = $request['father_name'];
        $user->id_card = $request['id_card'];
        $user->location = $request['location'];
        $user->phone = $request['phone'];
        $user->email = $request['email'];
        if (!empty($request['password'])) {
            $user->password = bcrypt($request['password']);
        }
        $user->bio = $request['bio'];
        $user->userType = $request['userType'];

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

        if ($request->filled('password')) {
            $request['password'] = bcrypt($request->password);
        } else {
            unset($request['password']);
        }

        $user->save();

        return redirect()->route('user.edit', $user->id)->with('success', 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $hotel = User::find($id);
        $hotel->delete();
        $data = User::where('status', 'active')->get();
        return redirect()->back()->with('success', 'Tour guide deleted successfully.');

    }
    public function view()
    {
        $data = User::where('status', 'active')->get();

        foreach ($data as $item) {
            $item->image = asset($item->image);
            $item->liked = like::where('type', "tourGuide")->where('obj_id', $item->id)->get()->count();

        }
        return Inertia::render('User/Users', [
            'data' => $data,
        ]);
    }
    public function viewDetial($id)
    {
        $data = User::where('id', $id)->get();

        foreach ($data as $item) {
            $item->image = asset($item->image);
            $item->liked = like::where('type', "tourGuide")->where('obj_id', $item->id)->get()->count();

        }
        return Inertia::render('User/UserDetails', [
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
        return Inertia::render('User/Tourists', [
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
        return Inertia::render('User/TouristDetial', [
            'data' => $data,
        ]);
    }

    public function numberOfActiveUser()
    {
        $data = User::all();
        return count($data);
    }

    public function numberOfActiveUserAccepted()
    {
        $data = User::where('status', 'active')->get();
        return count($data);
    }

    public function userRole()
    {
        $data = User::all();
        return $data;
    }
}
