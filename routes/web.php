<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartProductController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/




Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Test'); // This will get component Test.jsx from the resources/js/Pages/Test.jsx
    });
    
    Route::get('login', [AuthController::class, 'loginForm'])->name('login.form');
    Route::post('login/store', [AuthController::class, 'login'])->name('login');

    Route::get('register', [AuthController::class, 'registrationForm'])->name('registration.form');
    Route::post('register/store', [AuthController::class, 'register'])->name('registration');


});

Route::middleware('auth')->group(function () {

    Route::get('home', [HomeController::class, 'index'])->name('home');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('cart', [CartController::class, 'index'])->name('cart');

    Route::post('cart/add/{product}', [CartProductController::class, 'store'])->name('cart.add');

    Route::post('cart/checkout', [CartController::class, 'cartCheckout'])->name('cart.checkout');

});
