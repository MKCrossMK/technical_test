<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use App\Services\LogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use stdClass;
use Stripe\Charge;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class CartController extends Controller
{

    private $productAndAmount;
    /**
     * Display a listing of the resource.
     */
    private $logService ;
    public function __construct()
    {
        $this->logService = new LogService();
    }
    public function index()
    {
        $user = Auth::user();
        $cart = $user->cart?->cartProduct()->with('products')->get();
    


        return Inertia::render('Cart/Show', [
            'cart' => $cart,
            'user' => Auth::user()
        ]);
    }


    public function cartCheckout(Request $request) {

        if(!Auth::user()->cart){

            return redirect()->route('home');

        }
         $paymentMethod = $request->paymentMethod;
         $this->totalAmountInvoiceAndProducts();

        $totalAmount = $this->productAndAmount->totalAmount;
        $products = $this->productAndAmount->products;



         try {
            Stripe::setApiKey('sk_test_51NPabgF1zxRMppQBk2gegux6ymYXi2Gi85aD2iSuOfpK5X3x3st3lfh8fN9oSPp6MTE9TKnDoXDn0Un1xZTvrzPC00WCv4HcYN');
 
             // Crear el cargo en Stripe
             $intent = PaymentIntent::create([
                 'amount' => round($totalAmount), 
                 'currency' => 'usd',
                 'payment_method' => $paymentMethod,
                 'customer' => Auth::user()->stripe_id,
                 'confirmation_method' => 'manual',
             ]);
 

             if ($intent->status === 'requires_confirmation') {
                $intent->confirm();
            };

             $this->generateInvoice($intent->id, $products);

             $this->deleteCart();

             $this->logService->info(Auth::user()->email .' realizo el pago exitosamente');

              return redirect()->route('home')->with('success');

            
             return response()->json(['message' => 'Pago exitoso'], 200);
         } catch (\Exception $e) {

            $this->logService->error('Ha ocurrido un error al realizar pago // Error ' . $e->getMessage());

             return response()->json(['error' => $e->getMessage()], 400);
         }
     }
        

     public function generateInvoice($intentID, $products) {
        

        $totalAmount = 0;

        $invoice = new Invoice();
        $invoice->user_id = Auth::user()->id;
        $invoice->payment_id = $intentID;
        $invoice->payment_status = 'completed';
        $invoice->total_amount = 0;

        $invoice->save();

        foreach ($products as $product) {
            $item = $product->products[0];
            $quantity = $product->quantity;

            $totalAmount += $item->price * $quantity;

            InvoiceDetail::create([
                'invoice_id' => $invoice->id,
                'product_id' => $item->id,
                'quantity' => $quantity,
                'amount' => ($item->price * $quantity),
            ]);

        }

        $invoice->total_amount = $totalAmount;
        $invoice->save();
        $this->logService->info('Se ha generado la factura de  ' . Auth::user()->email . ' con el monto total de' . $totalAmount);


     }


     public function totalAmountInvoiceAndProducts() {
        $products = Auth::user()->cart->cartProduct()->with('products')->get();
        $totalAmount = 0;

        foreach ($products as $product) {
            $item = $product->products[0];
            $quantity = $product->quantity;

            $totalAmount += $item->price * $quantity;
        }

        $returned = new stdClass();
        $returned->products = $products;
        $returned->totalAmount = $totalAmount;

        $this->productAndAmount = $returned;

     }


     public function deleteCart() {

        $user = Auth::user();
       $cartProducts = $user->cart->cartProduct;

       foreach($cartProducts as $cartProduct){
        $cartProduct->delete();
       }

       $user->cart->delete();
       $this->logService->info('Se ha eliminado un carrito correspondiente a ' . $user->email);


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
    public function store(StoreCartRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartRequest $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
