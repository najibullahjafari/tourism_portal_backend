<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransportationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\HotelRequestController;
use App\Http\Controllers\tourguideController;
use App\Http\Controllers\tourguideRequestController;

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
    Route::get('hotelListView/{id}', [HotelController::class, 'show'])->name('hotelView');
    Route::post('hotelList/view/{id}', [HotelController::class, 'update'])->name('hotel.update');
    Route::get('addHotel', [HotelController::class, 'create'])->name('hotel.create');
    Route::post('addHotel', [HotelController::class, 'store'])->name('hotel.store');
    Route::delete('/hotels/{id}', [HotelController::class, 'destroy'])->name('hotels.destroy');
    // Hotel Request
    Route::get('/hotelRequest', [HotelRequestController::class, 'index'])->name('hotelRequest');
    Route::delete('/hotelRequest/{id}', [HotelRequestController::class, 'destroy'])->name('hotelRequest.destroy');
    Route::post("/hotelRequest/{id}", [HotelRequestController::class, 'update'])->name('hotelRequest.update');
    // Tour Guide 
    Route::get('tourGuide', [tourguideController::class, 'index'])->name('tourGuide');
    Route::delete('/tourguide/{id}', [tourguideController::class, 'destroy'])->name('tourguide.destroy');
    Route::get('addTourGuide', [tourguideController::class, 'create'])->name('addTourGuide');
    Route::post('addTourGuide', [tourguideController::class, 'store'])->name('tourguide.store');
    // Tour Guide Request
    Route::get('tourGuideRequest', [tourguideRequestController::class, 'index'])->name('tourGuideRequest');
    Route::post('car/requests', [TransportationController::class, 'store'])->name('transportation.requests');
    Route::delete('car/requests/{id}', [TransportationController::class, 'destroy'])->name('transportation.destroy');
    Route::post('car/requests', [TransportationController::class, 'store'])->name('transportation.requests');
    Route::get('/cars', [TransportationController::class, 'index'])->name('cars');
    Route::get('/cars/requests', function () {
        return Inertia::render('Transportation/CarRequests');
    })->name('cars/requests');
});


Route::get('/uikit/button', function () {
    return Inertia::render('main/uikit/button/page');
})->name('button');

Route::get('addHotel', function () {
    return Inertia::render('Hotel/AddHotel');
})->name('addHotel');

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
