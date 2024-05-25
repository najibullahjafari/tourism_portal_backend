<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use App\Models\Transportation;
use Inertia\Inertia;

// the start of class
class TransportationController extends Controller
{

  // the index function 
  public function index()
  {
    $transportations = Transportation::all();

    return Inertia::render('TransportationList', [
      'transportations' => $transportations
    ]);
  }
  public function store(Request $request)
  {
    // $validator = Validator::make($request->all(), [
    //   'name' => 'required',
    //   'email' => 'required|email',
    //   'phone' => 'required',
    //   'address' => 'required',
    //   'location' => 'required',
    //   'passport' => 'required',
    //   'image' => 'required',
    // ]);

    // if ($validator->fails()) {
    //   return Redirect::back()
    //     ->withErrors($validator)
    //     ->withInput();
    // }

    $transportation = new Transportation();
    $transportation->name = $request->name;
    $transportation->email = $request->email;
    $transportation->phone = $request->phone;
    $transportation->location = $request->location;
    $transportation->passport = $request->passport;
    $transportation->image = $request->image;
    $transportation->save();

    return Redirect::back()
      ->with('message', 'Car request has been sent successfully');
  }
}
// the end of class