<?php

use App\Http\Controllers\bookingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\sight_seeingController;
use App\Http\Controllers\TransportationController;
use App\Http\Controllers\Welcome;
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

Route::get(
    '/',
    [Welcome::class, 'sightSeeing']
)->name('welcome.sightSeeing');

Route::get(
    '/about-hotel',
    [Welcome::class, 'hotel']
)->name('welcome.hotel');
Route::get('/about-tourGuide', [Welcome::class, 'tourGuide'])->name('welcome.tourGuide');
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
    Route::group(['middleware' => ['role:super-admin|transport-admin']], function () {
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
    });

    // Hotel Routes
    Route::group(['middleware' => ['role:super-admin|hotel-admin']], function () {

        Route::get('/hotelList', [HotelController::class, 'index'])->name('hotelList');
        Route::get('/hotelListView/{id}', [HotelController::class, 'show'])->name('hotelView');
        Route::get('/addHotel', [HotelController::class, 'create'])->name('addHotel');
        Route::post('/addHotel', [HotelController::class, 'store'])->name('hotel.store');
        Route::delete('/hotels/{id}', [HotelController::class, 'destroy'])->name('hotels.destroy');
        Route::get('/HotelDashboard/{id}', [HotelController::class, 'viewHotel'])->name('hotel.dashboard');
        Route::put('/hotelUpdate/{id}', [HotelController::class, 'update'])->name('hotelUpdate');
        Route::get('/addFootCategory', [HotelController::class, 'createFootCategory'])->name('addFootCategory');
        Route::post('/addFootCategory', [HotelController::class, 'storeFootCategory'])->name('footCategory.store');
        Route::get('/footCategory', [HotelController::class, 'indexFootCategory'])->name('footCategories');
        Route::delete('/foodCategory/{id}', [HotelController::class, 'deleteFoodCategory'])->name('foodCategory.delete');
        Route::get('/addFood', [HotelController::class, 'createAddFood'])->name('addFood.create');
        Route::post('/addFood', [HotelController::class, 'AddFood'])->name('food.store');
        Route::get('/addRoom', [HotelController::class, 'createRoom'])->name(('room.create'));
        Route::post('/addRoom', [HotelController::class, 'storeRoom'])->name(('room.store'));
    });

    // Hotel Request
    Route::get('/hotelRequest', [HotelRequestController::class, 'index'])->name('hotelRequest');
    Route::delete('/hotelRequest/{id}', [HotelRequestController::class, 'destroy'])->name('hotelRequest.destroy');
    Route::post("/hotelRequest/{id}", [HotelRequestController::class, 'update'])->name('hotelRequest.update');


    // for setting 
    Route::get('/settings', [SettingsController::class, ''])->name('');

    // Sight Seeing Places
    Route::get('/sightSeeing', [sight_seeingController::class, 'index'])->name('sightSeeing.index');
    Route::get('/sightSeeingRequest', [sight_seeingController::class, 'show'])->name('userRequest');
    Route::get('/addSightSeeing', [sight_seeingController::class, 'create'])->name('sightSeeing.create');
    Route::post('/addSightSeeing', [sight_seeingController::class, 'store'])->name('sightSeeing.store');
    Route::delete('/sightSeeingRequest/{id}', [sight_seeingController::class, 'destroy'])->name('sighgtSeeingRequest.destroy');
    Route::post('/sightSeeingRequest/{id}', [sight_seeingController::class, 'change'])->name('sightSeeingRequest.update');
    Route::delete('/sightSeeing/{id}', [sight_seeingController::class, 'deleteSightSeeing'])->name('sightSeeing.delete');
    Route::get('/sightSeeingDashboard/{id}', [sight_seeingController::class, 'updateSightSeeing'])->name('sightSeeing.update');

    // Views
    Route::get('/hotel/view', [HotelController::class, 'view'])->name("hotels");
    // Route::get('/hotel/comment', [HotelController::class, 'comment'])->name('hotelComment');
    Route::get('/HotelDetial/{id}', [HotelController::class, 'showDetial'])->name('hotel.showDetial');
    Route::get('/sightSeeing/view', [sight_seeingController::class, 'view'])->name('sightSeeings');
    Route::get('/SightSeeingDetial/{id}', [sight_seeingController::class, 'viewDetial'])->name('SightSeeingDetial');
    Route::get('/tourGuide/view', [tourguideController::class, 'view'])->name('tourGuides');
    Route::get('/tourGuideDetial/{id}', [tourGuideController::class, 'viewDetial'])->name('TourGuideDetial');
    Route::get('/tourist/view', [tourguideController::class, 'viewTourist'])->name('tourists');
    Route::get('/touristDetial/{id}', [tourGuideController::class, 'touristDetial'])->name('touristDetial');

    // Like 
    Route::get('/like/{id}', [HotelController::class, 'like'])->name('hotel.like');

    // Booking tourguidebooking.store
    Route::get('/booking/obj/{id}', [bookingController::class, 'create'])->name('booking.create');
    Route::post('/booking/obj', [bookingController::class, 'store'])->name('booking.store');
    Route::get('/booking', [bookingController::class, 'showBooking'])->name('booking');
    Route::get('/booked', [bookingController::class, 'showBooked'])->name('booked');
    Route::delete('/booking/delete/{id}', [bookingController::class, 'deleteBooking'])->name('booking.delete');
    Route::delete('/booked/delete/{id}', [bookingController::class, 'deleteBooked'])->name('booked.delete');

    // for permission
    Route::group(['middleware' => ['role:super-admin']], function () {

        Route::resource('permissions', App\Http\Controllers\PermissionController::class);
        Route::get('permissions/{permissionId}/delete', [App\Http\Controllers\PermissionController::class, 'destroy']);

        Route::resource('roles', App\Http\Controllers\RoleController::class);
        Route::get('roles/{roleId}/delete', [App\Http\Controllers\RoleController::class, 'destroy']);
        Route::get('roles/{roleId}/give-permissions', [App\Http\Controllers\RoleController::class, 'addPermissionToRole']);
        Route::put('roles/{roleId}/give-permissions', [App\Http\Controllers\RoleController::class, 'givePermissionToRole']);

        Route::resource('users', App\Http\Controllers\UserController::class);
        Route::get('users/{userId}/delete', [App\Http\Controllers\UserController::class, 'destroy']);
        // User

        Route::get('user', [tourguideController::class, 'index'])->name('user');
        Route::delete('/user/{id}', [tourguideController::class, 'destroy'])->name('user.destroy');
        Route::get('/addUser', [tourguideController::class, 'create'])->name('addUser');
        Route::post('addUser', [tourguideController::class, 'store'])->name('addUser');
        Route::post('/userProfile/{id}', [tourguideController::class, 'edit'])->name('user.edit');
        Route::get('/userProfile/{id}', [tourguideController::class, 'edit'])->name('user.edit');
        Route::get('/userProfile/update', [tourguideController::class, 'update'])->name('user.update');
        // requested users
        Route::get('userRequest', [tourguideRequestController::class, 'index'])->name('userRequest.index');
        Route::delete('userRequest/{id}', [tourguideRequestController::class, 'destroy'])->name("tourguideRequest.destroy");
        Route::post("/userRequest/{id}", [tourguideRequestController::class, "update"])->name("tourguideRequest.update");

    });

    // Message
    Route::get('message', [HotelController::class, 'createMessage'])->name('hotelsMessage');
    Route::get('messageDetail/{id}', [HotelController::class, 'createMessageDetial'])->name('messageDetial');
    // Route::get('sendMessage', [HotelController::class, 'sendMessage'])->name('message.send');

});


Route::get('/uikit/button', function () {
    return Inertia::render('main/uikit/button/page');
})->name('button');
require __DIR__ . '/auth.php';
