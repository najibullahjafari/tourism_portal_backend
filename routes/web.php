<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransportationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    Route::get('/cars', [TransportationController::class, 'index'])->name('cars');
    Route::get('/cars/requests', function () {
        return Inertia::render('Transportation/CarRequests');
    })->name('cars/requests');
    Route::post('car/requests', [TransportationController::class, 'store'])->name('transportations.requests');
});


Route::get('/uikit/button', function () {
    return Inertia::render('main/uikit/button/page');
})->name('button');






require __DIR__ . '/auth.php';
