<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\HotelRequestController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})
    ->name('dashboard');
//    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/cars', function () {
        return Inertia::render('Transportation/Cars');
    })->name('cars');

    // Hotel Rout
    Route::get('/hotelList', [HotelController::class, 'index'])->name('hotelList');
    Route::get('hotelList/view/{id}', [HotelController::class, 'show'])->name('item.show');

    // Hotel Request
    Route::get('/hotelRequest', [HotelRequestController::class, 'index'])->name('hotelRequest');
});


Route::get('/uikit/button', function () {
    return Inertia::render('main/uikit/button/page');
})->name('button');
Route::get('/transportation', function () {
    return Inertia::render('Transportation');
})->name('transportation');



// Route::get('/hotelList', function () {
//     return Inertia::render('Hotel/HotelList');
// })->name('hotelList');
// Route::get('/hotelRequest', function () {
//     return Inertia::render('Hotel/HotelRequest');
// })->name('hotelRequest');

// Route::get('hotelList/view', function () {
//     return Inertia::render('Hotel/HotelView');
// })->name('hotelView');
Route::get('hotelRequest/view', function () {
    return Inertia::render('Hotel/HotelRequestView');
})->name('hotelRequestView');
Route::get('addHotel', function () {
    return Inertia::render('Hotel/AddHotel');
})->name('addHotel');

Route::get('tourGuide', function () {
    return Inertia::render('TourGuide/TourGuideList');
})->name('tourGuide');
Route::get('tourGuideRequest', function () {
    return Inertia::render('TourGuide/TourGuideRequest');
})->name('tourGuideRequest');
Route::get('addTourGuide', function () {
    return Inertia::render('TourGuide/AddTourGuide');
})->name('addTourGuide');
Route::get('tourGuideList/view', function () {
    return Inertia::render('TourGuide/TourGuideView');
})->name('tourGuideListView');
Route::get('tourGuideRequest/view', function () {
    return Inertia::render('TourGuide/TourGuideRequestView');
})->name('tourGuideRequestView');
require __DIR__ . '/auth.php';
