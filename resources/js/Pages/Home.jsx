import React from "react";
import AuthLayout from "../Layout/AuthLayout";
import { UserProvider } from "../Context/UserContext";
import CartProductsCard from "../Components/CartProductsCard";
import ProductCard from "../Components/ProductsCard";
import { InertiaLink } from "@inertiajs/inertia-react";

const Home = ({ products }) => {
    return (
        <UserProvider>
            <AuthLayout>
                <>
                    <div className="bg-orange-400 p-12">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-4xl text-white font-bold text-center">
                                Bienvenido
                            </h1>
                            <p className="text-white text-lg mt-4 text-center">
                                Explora los productos y añade a tu carrito
                            </p>
                            <div className="bg-white text-blue-500 font-bold px-6 py-2 mt-6 text-center rounded-full hover:bg-blue-200">
                                <InertiaLink href="cart">
                                    Ir al Carrito
                                </InertiaLink>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 m-5">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </>
            </AuthLayout>
        </UserProvider>
    );
};

export default Home;
