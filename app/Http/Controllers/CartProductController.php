<?php

namespace App\Http\Controllers;

use App\Models\CartProduct;
use App\Http\Requests\StoreCartProductRequest;
use App\Http\Requests\UpdateCartProductRequest;
use App\Models\Cart;
use App\Models\Product;
use App\Services\LogService;
use Illuminate\Support\Facades\Auth;

class CartProductController extends Controller
{

    private $logService;
    public function __construct()
    {
        $this->logService = new LogService();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCartProductRequest $request, Product $product)
    {
        $user = Auth::user();
        
        if(!$user->cart){
            $this->createCartAndAddProduct($user, $product);
         
        }else {
          
            $this->existProductOnCartAndCreate($request, $product, $user);
            $this->logService->info('Se ha añadido item al carrito');


        }
        

        return redirect()->route('cart');
        
    }

    public function createCartAndAddProduct($user, $product) {
        $cart = Cart::create([
            'user_id' => $user->id, 
        ]);

        CartProduct::create([
            'cart_id' => $cart->id,
            'product_id' => $product->id,
        ]);
        $this->logService->info('Se ha creado a un carrito para ' . $user->email . 'y añadido item al mismo');


    }


    public function existProductOnCartAndCreate($request, $product, $user) {
        $exist =  CartProduct::where('product_id', $product->id)->where('cart_id', $user->cart?->id)->first();

        if($exist) {
            $exist->quantity += 1;
            $exist->save();
            
        }else {
            CartProduct::create([
                'cart_id' => $user->cart->id,
                'product_id' => $product->id,
                // 'quantity' => $request->quantity,
            ]);
        }

        return true;


    }

    /**
     * Display the specified resource.
     */
    public function show(CartProduct $cartProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CartProduct $cartProduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartProductRequest $request, CartProduct $cartProduct)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CartProduct $cartProduct)
    {
        //
    }
}
