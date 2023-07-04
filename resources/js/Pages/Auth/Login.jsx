import React, { useEffect, useState } from "react";
import { GuestLayout } from "../../Layout/GuestLayout";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";

const Login = (props) => {

    const {
        data: { email, password },
        setData,
        post,
        reset,
        errors,
    } = useForm({
        email: "",
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    console.log(errors);
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

        post("login/store");
    };
    return (
        <GuestLayout auth={props.auth}>
               {errors.error && (
                        <div class="inline-block py-1 px-2 rounded-full text-sm font-semibold bg-red-500 text-white text-center w-full mb-4">{errors.error}</div>
                    )}
            <form onSubmit={submit}>
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
                        required
                    />

                    {errors.email && (
                        <div class="alert alert-danger">{errors.email}</div>
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
                        required
                    />

                    {errors.password && (
                        <div class="alert alert-danger">{errors.password}</div>
                    )}
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Log In
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

export default Login;
