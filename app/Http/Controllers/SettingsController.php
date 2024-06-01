<!-- the Setting controller -->
<?php
// satrt the code
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Profile;
use App\Models\Transportation;
use App\Models\Car;
use App\Models\CarRequest;
use App\Models\CarRequestStatus;
use App\Models\CarRequestStatusHistory;
use App\Models\CarRequestStatusType;

// the clast
class SettingsController extends Controller
{
  // the index function
  public function index()
  {
    // get the user
    $user = Auth::user();
    $profile = Profile::where('user_id', $user->id)->first();
    $cars = Car::where('user_id', $user->id)->get();
    $carRequests = CarRequest::where('user_id', $user->id)->get();
    $carRequestStatus = CarRequestStatus::all();
    $carRequestStatusHistory = CarRequestStatusHistory::all();
    $carRequestStatusType = CarRequestStatusType::all();
    $transportation = Transportation::where('user_id', $user->id)->get();
    return Inertia::render('Settings', [
      'user' => $user,
      'profile' => $profile,
      'cars' => $cars,
      'carRequests' => $carRequests,
      'carRequestStatus' => $carRequestStatus,
      'carRequestStatusHistory' => $carRequestStatusHistory,
      'carRequestStatusType' => $carRequestStatusType,
      'transportation' => $transportation,
    ]);
  }
  // the update function
  public function update(Request $request)
  {
    $user = Auth::user();
    $profile = Profile::where('user_id', $user->id)->first();
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255',
      'phone' => 'required|string|max:255',
      'address' => 'required|string|max:255',
      'city' => 'required|string|max:255',
      'state' => 'required|string|max:255',
      'zip' => 'required|string|max:255',
      'country' => 'required|string|max:255',
    ]);
    // update the profile
    $profile->update([
      'name' => $request->name,
      'email' => $request->email,
      'phone' => $request->phone,
      'address' => $request->address,
      'city' => $request->city,
      'state' => $request->state,
      'zip' => $request->zip,
      'country' => $request->country,
    ]);
    return Redirect::back()->with('success', 'Profile updated.');
  }
  // the destroy function
  public function destroy()
  {
    $user = Auth::user();
    $profile = Profile::where('user_id', $user->id)->first();
    $profile->delete();
    $user->delete();
    return Redirect::to('/')->with('success', 'Profile deleted.');
  }
}
// end the code
?>