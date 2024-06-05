<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
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
    // transportation part
    Route::get('/cars', function () {
        return Inertia::render('Transportation/Cars');
    })->name('cars');
    // Hotel Rout
    Route::get('/hotelList', [HotelController::class, 'index'])->name('hotelList');
    Route::get('hotelListView/{id}', [HotelController::class, 'show'])->name('hotelView');
    Route::post('hotelList/view/{id}', [HotelController::class, 'update'])->name('hotel.update');
    Route::get('addHotel', [HotelController::class, 'create'])->name('addHotel');
    Route::post('addHotel', [HotelController::class, 'store'])->name('hotel.store');
    Route::delete('/hotels/{id}', [HotelController::class, 'destroy'])->name('hotels.destroy');

    // Food Category Rout 
    Route::get('/addFootCategory', [HotelController::class, 'createFootCategory'])->name('addFootCategory');
    Route::post('/addFootCategory', [HotelController::class, 'storeFootCategory'])->name('footCategory.store');
    Route::get('/footCategory', [HotelController::class, 'indexFootCategory'])->name('footCategories');
    Route::delete('/foodCategory/{id}', [HotelController::class, 'deleteFoodCategory'])->name('foodCategory.delete');

    //Food Route
    Route::get('/addFood/{id}', [HotelController::class, 'createAddFood'])->name('addFood.create');

    // Hotel Request
    Route::get('/hotelRequest', [HotelRequestController::class, 'index'])->name('hotelRequest');
    Route::delete('/hotelRequest/{id}', [HotelRequestController::class, 'destroy'])->name('hotelRequest.destroy');
    Route::post("/hotelRequest/{id}", [HotelRequestController::class, 'update'])->name('hotelRequest.update');
    // Tour Guide 
    Route::get('tourGuide', [tourguideController::class, 'index'])->name('tourGuide');
    Route::delete('/tourguide/{id}', [tourguideController::class, 'destroy'])->name('tourguide.destroy');
    Route::get('addTourGuide', [tourguideController::class, 'create'])->name('addTourGuide');
    Route::post('addTourGuide', [tourguideController::class, 'store'])->name('addTourGuide');
    // Tour Guide Request
    Route::get('tourGuideRequest', [tourguideRequestController::class, 'index'])->name('tourGuideRequest');
    Route::delete('tourguideRequest/{id}', [tourguideRequestController::class, 'destroy'])->name("tourguideRequest.destroy");
    Route::post("/tourguideRequest/{id}", [tourguideRequestController::class, "update"])->name("tourguideRequest.update");
    // Transportation
    Route::get('/cars', function () {
        return Inertia::render('Transportation/cars');
    })->name('cars');
    Route::post('car/requests', [TransportationController::class, 'store'])->name('transportation.requests');
    Route::delete('car/requests/{id}', [TransportationController::class, 'destroy'])->name('transportation.destroy');
    Route::post('car/requests/', [TransportationController::class, 'store'])->name('transportation.requests');
    Route::post('car/accepted/{id}', [TransportationController::class, 'acceptCar']);
    Route::get('/car/last-transportation-id', [TransportationController::class, 'lastTransportationId']);
    Route::post('car/rejected/{id}', [TransportationController::class, 'rejectCar']);
    Route::get('/cars', [TransportationController::class, 'index'])->name('cars');
    Route::get('cars/requested/cars', [TransportationController::class, 'showrequests'])->name('cars.requested.cars');
    Route::get('/cars/requests', function () {
        return Inertia::render('Transportation/CarRequests');
    })->name('cars.requests');
    // for setting 
    Route::get('/settings', [SettingsController::class, ''])->name('');
});


Route::get('/uikit/button', function () {
    return Inertia::render('main/uikit/button/page');
})->name('button');

Route::get('addHotel', function () {
    return Inertia::render('Hotel/AddHotel');
})->name('addHotel');



Route::get('tourGuideList/view', function () {
    return Inertia::render('TourGuide/TourGuideView');
})->name('tourGuideListView');
Route::get('tourGuideRequest/view', function () {
    return Inertia::render('TourGuide/TourGuideRequestView');
})->name('tourGuideRequestView');
require __DIR__ . '/auth.php';
