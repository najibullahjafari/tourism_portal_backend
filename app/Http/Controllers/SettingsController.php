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
use App\Http\Controllers\ProfileController;


// the clast
class SettingsController extends Controller
{
  // the index function
  public function index()
  {
    $profile = new ProfileController();
    return $profile->index();
  }
  // the update function
  public function update(Request $request)
  {
   
    return Redirect::back()->with('success', 'Profile updated.');
  }
  // the destroy function
  public function destroy()
  {
   
    return Redirect::to('/')->with('success', 'Profile deleted.');
  }
}
// end the code
?>