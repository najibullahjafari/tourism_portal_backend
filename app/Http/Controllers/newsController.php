<?php

namespace App\Http\Controllers;

use App\Models\news;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Redirect;

class newsController extends Controller
{
    //
    public function create($id)
    {
        return Inertia::render('News/AddNews', ['id' => $id]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required',
            'sightSeeing_id' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',


        ]);
        $photoAddressPath = null;
        if ($request->hasFile('image')) {
            try {
                $file = $request->file('image');
                $destinationPath = public_path('storage/image');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $file->move($destinationPath, $fileName);
                if (!file_exists($destinationPath . '/' . $fileName)) {
                    return Redirect::back()->with('error', 'Failed to save passport. Please try again.');
                }
                $photoAddressPath = 'storage/image/' . $fileName;
            } catch (\Exception $e) {
                return Redirect::back()->with('error', 'An error occurred while uploading the passport: ' . $e->getMessage());
            }
        } else {
            return Redirect::back()->with('error', 'No passport file found in the request.');
        }

        $news = new news();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->sightSeeing_id = $request->sightSeeing_id;
        $news->image = $photoAddressPath;
        $news->save();

        return redirect::back()->with('message', 'News request has been sent successfully');
    }
}
