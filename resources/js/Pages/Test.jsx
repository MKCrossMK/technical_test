import React from "react";
import { GuestLayout } from "../Layout/GuestLayout";
import { InertiaLink } from "@inertiajs/inertia-react";

const Test = () => {
    return (
        <GuestLayout>
            <h1 className="bg-danger text-center font-bold text-2xl">
                Bienvenido a mi Prueba Técnica{" "}
                <span className="text-sm font-normal">
                    <p>Control Acceso, Logs y Cashier</p>
                </span>
            </h1>

            <div className="flex justify-center mt-2">
                <div className="w-1/2 flex">
                    <InertiaLink
                        href={"login"}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md mr-2 text-center"
                    >
                        Login
                    </InertiaLink>
                    <InertiaLink
                        href={"register"}
                        className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md text-center"
                    >
                        Registrate
                    </InertiaLink>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Test;
