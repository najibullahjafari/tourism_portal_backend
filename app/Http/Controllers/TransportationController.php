<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use App\Models\Transportation;
use Inertia\Inertia;

// the start of class
class TransportationController extends Controller
{

  // the index function 
  public function index()
  {
    // if the status is pending then do not show it
    $cars = Transportation::where('status', 'accepted')->get();
    foreach ($cars as $car) {
      $car->passport = asset($car->passport);
      $car->image = asset($car->image);
    }

    return Inertia::render('Transportation/Cars', ['data' => $cars]);
  }
  public function store(Request $request)
  {
    // Validate the incoming request
    $request->validate([
      'name' => 'required|string|max:255',
      'location' => 'required|string|max:255',
      'passport' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
      'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    $passportPath = null;

    // Check if the passport file exists and store it
    if ($request->hasFile('passport')) {
      try {
        $file = $request->file('passport');
        $destinationPath = public_path('storage/passports');
        $fileName = time() . '.' . $file->getClientOriginalExtension();
        $file->move($destinationPath, $fileName);
        if (!file_exists($destinationPath . '/' . $fileName)) {
          return Redirect::back()->with('error', 'Failed to save passport. Please try again.');
        }
        $passportPath = 'storage/passports/' . $fileName;
      } catch (\Exception $e) {
        return Redirect::back()->with('error', 'An error occurred while uploading the passport: ' . $e->getMessage());
      }
    } else {
      return Redirect::back()->with('error', 'No passport file found in the request.');
    }

    // Check if the passport file exists and store it
    if ($request->hasFile('image')) {
      try {
        $file = $request->file('image');
        $destinationPath = public_path('storage/images');
        $fileName = time() . '.' . $file->getClientOriginalExtension();
        $file->move($destinationPath, $fileName);
        if (!file_exists($destinationPath . '/' . $fileName)) {
          return Redirect::back()->with('error', 'Failed to save image. Please try again.');
        }
        $imagePath = 'storage/images/' . $fileName;
      } catch (\Exception $e) {
        return Redirect::back()->with('error', 'An error occurred while uploading the image: ' . $e->getMessage());
      }
    } else {
      return Redirect::back()->with('error', 'No image file found in the request.');
    }

    // Store other fields and the file path in the database
    $transportation = new Transportation();
    $transportation->name = $request->name;
    $transportation->tazkira_no = $request->tazkira_no;
    $transportation->phone = $request->phone;
    $transportation->location = $request->location;
    $transportation->passport = $passportPath;
    $transportation->image = $imagePath;
    $transportation->discription = $request->discription;
    $transportation->save();

    // here to redirect to cars list
    return redirect('/cars')->with('message', 'Car added successfully.');
  }

  // to edit the car
  public function edit($id)
  {
    $car = Transportation::find($id);
    if (!$car) {
      return Redirect::back()->with('error', 'Car not found.');
    }
    return Inertia::render('Transportation/EditCar', ['car' => $car]);
  }

  public function update(Request $request, $id)
  {
    // Find the car by ID
    $car = Transportation::find($id);
    if (!$car) {
      return Redirect::back()->with('error', 'Car not found.');
    }
    $r = $request;

    // Validate the incoming request
    $request->validate([
      'name' => 'required|string|max:255',
      'location' => 'required|string|max:255',
      'passport' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
      'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    // Update the car fields
    $car->name = $request->name;
    $car->tazkira_no = $request->tazkira_no;
    $car->father_name = $request->father_name;
    $car->phone = $request->phone;
    $car->location = $request->location;
    $car->discription = $request->discription;

    // Check if a new passport file is uploaded
    if ($request->hasFile('passport')) {
      try {
        // Delete the old passport image file
        if ($car->passport) {
          $file = public_path($car->passport);
          if (file_exists($file)) {
            unlink($file);
          }
        }

        // Store the new passport file
        $file = $request->file('passport');
        $destinationPath = public_path('storage/passports');
        $fileName = time() . '.' . $file->getClientOriginalExtension();
        $file->move($destinationPath, $fileName);
        if (!file_exists($destinationPath . '/' . $fileName)) {
          return Redirect::back()->with('error', 'Failed to save passport. Please try again.');
        }
        $car->passport = 'storage/passports/' . $fileName;
      } catch (\Exception $e) {
        return Redirect::back()->with('error', 'An error occurred while uploading the passport: ' . $e->getMessage());
      }
    }

    // Check if a new image file is uploaded
    if ($request->hasFile('image')) {
      try {
        // Delete the old image file
        if ($car->image) {
          $file = public_path($car->image);
          if (file_exists($file)) {
            unlink($file);
          }
        }

        // Store the new image file
        $file = $request->file('image');
        $destinationPath = public_path('storage/images');
        $fileName = time() . '.' . $file->getClientOriginalExtension();
        $file->move($destinationPath, $fileName);
        if (!file_exists($destinationPath . '/' . $fileName)) {
          return Redirect::back()->with('error', 'Failed to save image. Please try again.');
        }
        $car->image = 'storage/images/' . $fileName;
      } catch (\Exception $e) {
        return Redirect::back()->with('error', 'An error occurred while uploading the image: ' . $e->getMessage());
      }
    }

    // Save the updated car
    $car->save();

    return Redirect::to('/cars')->with('message', 'Car updated successfully.');
  }



  public function destroy(
    $id
  ) {
    $car = Transportation::find($id);
    if (!$car) {
      return Redirect::back()->with('error', 'Car not found.');
    }

    // Delete the passport image file
    if ($car->passport) {
      $file = public_path($car->passport);
      if (file_exists($file)) {
        unlink($file);
      }
    }

    // Delete the image file
    if ($car->image) {
      $file = public_path($car->image);
      if (file_exists($file)) {
        unlink($file);
      }
    }

    $car->delete();
    return Redirect::to('/cars')->with('message', 'Car deleted successfully.');
  }

  public function showrequests()
  {
    $cars = Transportation::where('status', '=', 'pending')->get();
    foreach ($cars as $car) {
      $car->passport = asset($car->passport);
      $car->image = asset($car->image);
    }
    return Inertia::render('Transportation/RequestedCars', ['data' => $cars]);
  }

  public function acceptCar($id)
  {
    $car = Transportation::find($id);
    $car->status = 'accepted';
    $car->save();
    return Redirect::to('/cars/requested/cars')->with('message', 'Car accepted successfully.');
  }
  public function rejectCar($id)
  {
    $car = Transportation::find($id);
    $car->status = 'rejected';
    $car->save();
    return Redirect::to('/cars/requested/cars')->with('message', 'Car rejected successfully.');
  }

  public function lastTransportationId()
  {
    $car = Transportation::latest()->first();
    return $car->id;
  }
  // to get the number of cars
  public function getNumberOfCars()
  {
    $cars = Transportation::where('status', 'accepted')->get();
    return count($cars);
  }

  public function allCars()
  {
    $cars = Transportation::all();
    return count($cars);
  }
}