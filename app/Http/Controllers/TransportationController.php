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
    $cars = Transportation::all();
    return Inertia::render('Transportation/TransportationList', ['data' => $cars]);
  }
  public function store(Request $request)
  {
    // Validate the incoming request
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|email|max:255|unique:transportations',
      'location' => 'required|string|max:255',
      'passport' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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
    $transportation->email = $request->email;
    $transportation->phone = $request->phone;
    $transportation->location = $request->location;
    $transportation->passport = $passportPath;
    $transportation->image = $imagePath;
    $transportation->save();

    // here to redirect to cars list
    return redirect('/cars')->with('message', 'Car added successfully.');
  }


  public function destroy($id)
  {
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
}