import React, { useEffect, useState } from "react";
import { GuestLayout } from "../../Layout/GuestLayout";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";

const Registration = () => {
    const {
        data: { name, email, password, password_confirmation },
        setData,
        post,
        reset,
        errors
    } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post("register/store");
    };
    return (
        <GuestLayout>
            <form onSubmit={submit}>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={name}
                        onChange={onHandleChange}
                        
                    />

                    {errors.name && (
                        <div className="badge badge-danger">
                            {errors.name}
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={email}
                        onChange={onHandleChange}
                    />
                     {errors.email && (
                        <div className="badge badge-danger">
                          {errors.email}
                        </div>
                     )}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={password}
                        onChange={onHandleChange}
                    />
                     {errors.password && (
                        <div className="badge badge-danger">
                            {errors.password}
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password_confirmation"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={password_confirmation}
                        onChange={onHandleChange}
                    />
                     {errors.password_confirmation && (
                        <div className="badge badge-danger">
                            {errors.password_confirmation}
                        </div>
                    )}
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Registrarme
                    </button>
                </div>

                <div className="w-full mt-2">
                    <InertiaLink href={"/"}>
                        <button className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600">
                            Volver
                        </button>
                    </InertiaLink>
                </div>
            </form>
        </GuestLayout>
    );
};

export default Registration;
