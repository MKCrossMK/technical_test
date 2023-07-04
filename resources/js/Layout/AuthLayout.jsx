import React, { useContext, useEffect, useState } from "react";
import img_avatar from "../../../public/img/avatar.png";
import "../../css/auth.css";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import { UserContext } from "../Context/UserContext";

const AuthLayout = ({ children}) => {
    const loggedInUser = useContext(UserContext);
    const [isMobile, setIsMobile] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsDropdownOpen(false);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const {
        post,
    } = useForm();


    const onLogout = (e) => {
        e.preventDefault();

        post("logout");
    }

    return (
        <>
            <nav className="bg-blue-500 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-xl font-bold">TechTest</div>

                    {isMobile ? (
                        <>
                            <div className="text-white mr-4">
                                <button
                                    className="text-white focus:outline-none"
                                    onClick={toggleDropdown}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                            </div>

                    
                        </>
                    ) : (
                        <>
                            <div
                                style={{ cursor: 'pointer' }}
                                className="flex items-center space-x-4 hover:bg-blue-600 rounded p-1"
                                onClick={toggleUserDropdown}
                            >
                                <img
                                    src={img_avatar}
                                    alt=""
                                    className="img_logo"
                                />

                                <div className="text-white">
                                    {loggedInUser.name}
                                </div>
                            </div>

                            {isUserDropdownOpen && (
                                <div className="absolute top-20 right-4 bg-white rounded shadow-md py-2 px-6 flex flex-col gap-5">
                                    <div className="text-gray-700">
                                        <InertiaLink  href="cart">
                                            Mi Carrito
                                        </InertiaLink>
                                    </div>
                                    <div>
                                        <form onSubmit={onLogout}>
                                            <button type="submit" className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded w-full">
                                                Logout
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {isDropdownOpen && (
                    <div className="mt-3 flex flex-col gap-3">
                        <div className="text-gray-700">
                            {loggedInUser.name}
                        </div>
                        <div className="text-white">
                            
                        <InertiaLink  href="cart">
                            Mi Carrito
                        </InertiaLink>
                        </div>
                        <div>
                            <form onSubmit={onLogout}>
                                <button type="submit" className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded w-full">
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                    )}
            </nav>
            {children}

            
        </>
    );
};

export default AuthLayout;
