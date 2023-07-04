import React from "react";
import AuthLayout from "../../Layout/AuthLayout";
import { UserProvider } from "../../Context/UserContext";
import CartProductsCard from "../../Components/CartProductsCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../../Components/PaymentForm";
import { InertiaLink } from "@inertiajs/inertia-react";

const ShowCart = ({ cart }) => {
    const stripePromise = loadStripe(
        "pk_test_51NPabgF1zxRMppQBVx9yIZ7aerogkKFsZzyg8mMCARLB9EzQmNQ0q8NgSIvOmSEx8XUtYQ8UwvvhHUtbRIPFjatk00cR8BFIjN"
    );

    const disabled = cart ? false : true;

    return (
        <UserProvider>
            <AuthLayout>
                <>
                    <div className="bg-orange-400 p-12">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-4xl text-white font-bold">
                                Mi Carrito
                            </h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        <div className="col-span-7">
                            {cart ? (
                                cart.map(({ products }) => (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 m-5">
                                        <CartProductsCard
                                            key={products[0].id}
                                            product={products[0]}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="inline-block py-1 px-2 m-5 text-sm font-bold bg-indigo-500 text-white text-center w-full mt-10">
                                    <p>Carrito Vacio</p>
                                    <p>
                                        {" "}
                                        Observa los productos y añadeal carrito
                                    </p>
                                </div>
                            )}
                            <InertiaLink href={"/"}>
                                <button className="w-full py-2 px-4 bg-orange-400 font-bold text-white rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600 m-5 mt-20">
                                    Volver
                                </button>
                            </InertiaLink>
                        </div>
                        <div className="col-span-5 m-10">
                            <Elements stripe={stripePromise}>
                                <PaymentForm disabled={disabled} />
                            </Elements>
                        </div>
                    </div>
                </>
            </AuthLayout>
        </UserProvider>
    );
};

export default ShowCart;
