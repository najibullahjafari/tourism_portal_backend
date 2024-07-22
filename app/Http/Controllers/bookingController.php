<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\booking;
use Illuminate\Support\Facades\Auth;


class bookingController extends Controller
{
    public function create($id, Request $request)
    {
        return Inertia::render('Booking/Book', ['id' => $id, 'type' => $request->type]);
    }
    public function store(Request $request)
    {
        $user_id = auth::user()->id;
        $booking = new booking();
        $booking->obj_type = $request->obj_type;
        $booking->obj_id = $request->obj_id;
        $booking->start_date = $request->start_date;
        $booking->booker_id = $user_id;
        $booking->save();
        if ($request->obj_type == 'tourguide') {

            return redirect()->route('welcome.tourGuide');
        } else {
            return redirect()->route('welcome.hotel');

        }
    }
    public function showBooked(Request $request)
    {
        $user_id = auth::user()->id;
        $data = $data = booking::where('booker_id', $user_id);
        if ($request->has("category") && $request->has("q")) {
            $col = $request->category;
            $val = $request->q;
            $data = $data->where($col, 'like', '%' . $val . '%');


        }

        $data = $data->get();
        return Inertia::render('Booking/Booked', ['data' => $data]);
    }
    public function deleteBooked($id)
    {
        $data = booking::find($id);
        $data->delete();
        return redirect()->route('booked');
    }

    //show what I had booked

    public function showBooking(Request $request)
    {

        $user_id = auth::user()->id;
        $data = $data = booking::where('obj_id', $user_id);
        if ($request->has("category") && $request->has("q")) {
            $col = $request->category;
            $val = $request->q;
            $data = $data->where($col, 'like', '%' . $val . '%');


        }

        $data = $data->get();
        return Inertia::render('Booking/Booking', ['data' => $data]);
    }

    public function deleteBooking($id)
    {
        $data = booking::find($id);
        $data->delete();
        return redirect()->route('booking');
    }

}
