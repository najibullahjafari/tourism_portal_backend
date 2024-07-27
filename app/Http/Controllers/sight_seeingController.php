<?php

namespace App\Http\Controllers;

use App\Models\like;
use App\Models\news;
use App\Models\sight_seeing;
use App\Models\Hotel; // Add this line to import the 'Hotel' class
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

    public function getSightSeeing()
    {
        $data = sight_seeing::where('status', 'active')->get();

        return response()->json([
            'data' => $data,
        ]);
    }

    public function show(Request $request)
    {
        if ($request->has("category") && $request->has("q")) {
            $col = $request->category;
            $val = $request->q;
            $data = sight_seeing::where('status', 'deactive')->where($col, 'like', '%' . $val . '%')->get();
        } else {
            $data = sight_seeing::where('status', 'deactive')->get();
        }

        foreach ($data as $item) {
            if (strpos($item->image, ',') !== false) {
                // The image attribute contains multiple paths, split by commas
                $imagePaths = explode(',', $item->image);
                $imageUrls = [];
                foreach ($imagePaths as $path) {
                    $imageUrls[] = asset($path); // Generate URL for each path
                }
                $item->image = $imageUrls; // Store the array of URLs
            } else {
                // Single image path, directly generate its URL
                $item->image = [asset($item->image)]; // Ensure it's stored as an array for consistency
            }
        }

        return Inertia::render('SightSeeing/SightSeeingRequest', [
            'data' => $data,
        ]);
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
            // Assuming 'images' is the name for the input field for multiple files
            // 'images' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'status' => 'string',
        ]);

        $SightSeeingPaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                try {
                    $destinationPath = public_path('storage/SightSeeing');
                    $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                    $file->move($destinationPath, $fileName);
                    if (!file_exists($destinationPath . '/' . $fileName)) {
                        return Redirect::back()->with('error', 'Failed to save image. Please try again.');
                    }
                    $SightSeeingPaths[] = 'storage/SightSeeing/' . $fileName;
                } catch (\Exception $e) {
                    return Redirect::back()->with('error', 'An error occurred while uploading the image: ' . $e->getMessage());
                }
            }
        } else {
            return Redirect::back()->with('error', 'No image file found in the request.');
        }

        $sightSeeing = new sight_seeing();
        $sightSeeing->name = $request->name;
        $sightSeeing->address = $request->address;
        $sightSeeing->province = $request->province;
        // Convert the array of paths to a string to store in the database, or adjust according to your database design
        $sightSeeing->image = implode(',', $SightSeeingPaths);
        $sightSeeing->open_time = $request->open_time;
        $sightSeeing->close_time = $request->close_time;
        $sightSeeing->ticket_cost = $request->ticket_cost;
        $sightSeeing->description = $request->description;
        $sightSeeing->status = $request->status;
        $sightSeeing->save();
        return Inertia::render('Hotel/addHotel');
    }
    public function destroy($id)
    {
        $sight_seeing = sight_seeing::find($id);
        $sight_seeing->delete();
        // to delete the image file from the server
        $imagePaths = explode(',', $sight_seeing->image);
        foreach ($imagePaths as $path) {
            if (file_exists(public_path($path))) {
                unlink(public_path($path));
            }
        }
        return redirect()->route('sightSeeing.index');
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

            $sightSeeing = sight_seeing::find($id);
            $sightSeeing->name = $request->name;
            $sightSeeing->address = $request->address;
            $sightSeeing->province = $request->province;
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
        $news = news::where('sightSeeing_id', $id)->get();
        foreach ($news as $item) {
            $item->image = asset($item->image);
            $item->liked = like::where('type', "sightSeeingNews")->where('obj_id', $item->id)->get()->count();

        }
        foreach ($data as $item) {
            $item->image = asset($item->image);
            $item->liked = like::where('type', "sight_seeing")->where('obj_id', $item->id)->get()->count();

        }
        return Inertia::render('SightSeeing/SightSeeingDetial', [
            'data' => $data,
            'news' => $news
        ]);
    }
    // public function dependedHotel($id)
    // {
    //     $data = Hotel::whereHas('sightSeeings', function ($query) use ($id) {
    //         $query->where('sight_seeing_id', $id);
    //     })->get();
    //     return response()->json([
    //         'data' => $data,
    //     ]);
    // }

    public function getBooking()
    {
        $data = booking::all();
        $user = auth()->user();
        return response()->json([
            'data' => $data,
        ]);
    }
}
