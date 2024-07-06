<?php

namespace App\Http\Controllers;

use App\Models\like;
use App\Models\sight_seeing;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;

class sight_seeingController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has("category") && $request->has("q")) {
            $col = $request->category;
            $val = $request->q;
            $data = sight_seeing::where('status', 'active')->where($col, 'like', '%' . $val . '%')->get();
            foreach ($data as $item) {
                $item->image = asset($item->image);

            }
            return Inertia::render('SightSeeing/SightSeeing', [
                'data' => $data,
            ]);

        } else {


            $data = sight_seeing::where('status', 'active')->get();
            foreach ($data as $item) {
                $item->image = asset($item->image);

            }
            return Inertia::render('SightSeeing/SightSeeing', [
                'data' => $data,
            ]);
        }
    }
    public function show(Request $request)
    {
        if ($request->has("category") && $request->has("q")) {
            $col = $request->category;
            $val = $request->q;
            $data = sight_seeing::where('status', 'deactive')->where($col, 'like', '%' . $val . '%')->get();
            foreach ($data as $item) {
                $item->image = asset($item->image);

            }
            return Inertia::render('SightSeeing/SightSeeingRequest', [
                'data' => $data,
            ]);

        } else {


            $data = sight_seeing::where('status', 'deactive')->get();
            foreach ($data as $item) {
                $item->image = asset($item->image);

            }
            return Inertia::render('SightSeeing/SightSeeingRequest', [
                'data' => $data,
            ]);
        }
    }
    public function create()
    {
        return Inertia::render('SightSeeing/addSightSeeing');
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'province' => 'required|string',
            'close_time' => 'required|date',
            'open_time' => 'required|date',
            'description' => 'required|string',
            'ticket_cost' => 'required|string',
            // 'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'status' => 'string',

        ]);
        $SightSeeingPath = null;
        if ($request->hasFile('image')) {
            try {
                $file = $request->file('image');
                $destinationPath = public_path('storage/SightSeeing');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $file->move($destinationPath, $fileName);
                if (!file_exists($destinationPath . '/' . $fileName)) {
                    return Redirect::back()->with('error', 'Failed to save passport. Please try again.');
                }
                $SightSeeingPath = 'storage/SightSeeing/' . $fileName;
            } catch (\Exception $e) {
                return Redirect::back()->with('error', 'An error occurred while uploading the passport: ' . $e->getMessage());
            }
        } else {
            return Redirect::back()->with('error', 'No passport file found in the request.');
        }

        $sightSeeing = new sight_seeing();
        $sightSeeing->name = $request->name;
        $sightSeeing->address = $request->address;
        $sightSeeing->province = $request->province;
        $sightSeeing->image = $SightSeeingPath;
        $sightSeeing->open_time = $request->open_time;
        $sightSeeing->close_time = $request->close_time;
        $sightSeeing->ticket_cost = $request->ticket_cost;
        $sightSeeing->description = $request->description;
        $sightSeeing->status = $request->status;
        $sightSeeing->save();
        return Inertia::render('Hotel/addHotel');
        // return redirect::back()->with('message', 'Hotel request has been sent successfully');

    }
    public function destroy($id)
    {
        $sight_seeing = sight_seeing::find($id);
        $sight_seeing->delete();
        return redirect()->route('userRequest');
    }
    public function change($id, Request $request)
    {
        $sight_seeing = sight_seeing::find($id);
        $sight_seeing->status = 'active';
        $sight_seeing->save();
        return redirect()->route('userRequest');
    }

    public function deleteSightSeeing($id)
    {
        $sight_seeing = sight_seeing::find($id);
        $sight_seeing->status = 'deactive';
        $sight_seeing->save();
        return redirect()->route('userRequest');
    }
    public function updateSightSeeing($id, Request $request)
    {
        if ($request->has('name') && $request->has('address') && $request->has('province') && $request->has('open_time') && $request->has('close_time') && $request->has('ticket_cost') && $request->has('description')) {
            // $SightSeeingPath = null;
            // if ($request->hasFile('image')) {
            //     try {
            //         $file = $request->file('image');
            //         $destinationPath = public_path('storage/SightSeeingUpdate');
            //         $fileName = time() . '.' . $file->getClientOriginalExtension();
            //         $file->move($destinationPath, $fileName);
            //         if (!file_exists($destinationPath . '/' . $fileName)) {
            //             $found = true;
            //         }
            //         $SightSeeingPath = 'storage/SightSeeingUpdate/' . $fileName;
            //     } catch (\Exception $e) {
            //         return Redirect::back()->with('error', 'An error occurred while uploading the passport: ' . $e->getMessage());
            //     }
            // } else {
            //     return Redirect::back()->with('error', 'No passport file found in the request.');
            // }

            $sightSeeing = sight_seeing::find($id);
            $sightSeeing->name = $request->name;
            $sightSeeing->address = $request->address;
            $sightSeeing->province = $request->province;
            // $sightSeeing->image = $SightSeeingPath;
            $sightSeeing->open_time = $request->open_time;
            $sightSeeing->close_time = $request->close_time;
            $sightSeeing->ticket_cost = $request->ticket_cost;
            $sightSeeing->description = $request->description;
            $sightSeeing->status = "active";
            $sightSeeing->save();
            return redirect()->route('sightSeeing.index');
            //     return redirect::back()->with('message', 'Hotel request has been sent successfully');
        } else {

            $data = sight_seeing::find($id);
            // foreach ($data as $item) {
            //     $item->image = asset($item->image);

            // }
            return Inertia::render('SightSeeing/SightSeeingUpdate', ['data' => $data]);
        }
    }
    public function view()
    {
        $data = sight_seeing::where('status', 'active')->get();

        foreach ($data as $item) {
            $item->image = asset($item->image);
            $item->liked = like::where('type', "sight_seeing")->where('obj_id', $item->id)->get()->count();

        }
        return Inertia::render('SightSeeing/SightSeeings', [
            'data' => $data,
        ]);
    }
    public function viewDetial($id)
    {
        $data = sight_seeing::where('id', $id)->get();

        foreach ($data as $item) {
            $item->image = asset($item->image);
            $item->liked = like::where('type', "sight_seeing")->where('obj_id', $item->id)->get()->count();

        }
        return Inertia::render('SightSeeing/SightSeeingDetial', [
            'data' => $data,
        ]);
    }
}
