<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    
    public function index() {
    
        $products = Product::where('stock', '>', 0)->get();
        return Inertia::render('Home', [
            "user" => Auth::user(),
            "products" => $products
        ]);
    }
}
