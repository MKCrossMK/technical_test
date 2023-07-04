<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use App\Services\LogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Route;

class AuthController extends Controller
{
    public $logService;
    public function __construct()
    {

        $this->logService = new LogService();
        
    }

    public function loginForm(): Response
    {
        return Inertia::render('Auth/Login'); 
    }

    public function login(Request $request  ) 
    {
         $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $this->logService->info($request->email .' logueo');

            return redirect()->intended(RouteServiceProvider::HOME);
        } else {
            return redirect()->back()->withErrors(['error' => 'Correo Electronico/Password no son correctas']);
        }
    }

    public function registrationForm(): Response
    {
        return Inertia::render('Auth/Registration'); 
    }

    public function register(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->createAsStripeCustomer();
        $this->logService->info($user->email .' creado  como usuario y registrado en stripe');

        Auth::login($user);
        
        return redirect()->intended(RouteServiceProvider::HOME);
    }

    public function logout(Request $request) {
        $user = Auth::user()->email;
        Auth::logout();
        $this->logService->info($user .' ha cerrado sesión');

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
