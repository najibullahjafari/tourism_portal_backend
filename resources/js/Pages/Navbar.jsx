import { Link, router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import React, { useState } from "react";
import NavLink from "@/Components/NavLink";
import Config from "./Config";
import MyBookings from "./Booking/MyBookings";

const Navbar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isBookingsDialogOpen, setIsBookingsDialogOpen] = useState(false);
    const { data, user } = usePage().props;
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="sticky top-0 shadow-sm text-white z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="container top-1 mx-auto py-4 flex justify-between items-center">
                    <Link href="/dashboard" className="flex-shrink-0">
                        <img
                            src="/images/logo/TourismDark.png"
                            className="w-2 rotate-on-hover"
                            alt=""
                        />
                    </Link>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink
                                href={route("welcome.sightSeeing")}
                                className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                            >
                                Places
                            </NavLink>
                            <NavLink
                                href={route("welcome.hotel")}
                                className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                            >
                                Hotel
                            </NavLink>
                            <NavLink
                                href={route("SighnUser")}
                                className="block px-3 py-2 bg-primary rounded-md text-base font-medium hover:bg-gray-700 hover:text-white"
                            >
                                Request
                            </NavLink>
                            <NavLink
                                href={route("welcome.transport")}
                                className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                            >
                                Transport
                            </NavLink>
                            <NavLink
                                href={route("apidocumentation")}
                                className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                            >
                                Api
                            </NavLink>
                            <span
                                onClick={() => setIsBookingsDialogOpen(true)}
                                className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                            >
                                reserved
                            </span>

                            {user ? (
                                <>
                                    <span
                                        alt={user.name}
                                        className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                                    >
                                        {user.name}
                                    </span>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                                    >
                                        <span>Logout</span>
                                    </Link>
                                </>
                            ) : (
                                <span
                                    onClick={() => {
                                        router.get("login");
                                    }}
                                    className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                                >
                                    Login
                                </span>
                            )}
                        </div>
                        <Config />
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            type="button"
                            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            onClick={toggleMenu}
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={
                                        isOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`md:hidden ${isOpen ? "block" : "hidden"}`}
                id="mobile-menu"
            >
                <div className="flex flex-col px-2 pt-2 pb-3 space-y-1 gap-2 sm:px-3">
                    <NavLink
                        href={route("welcome.sightSeeing")}
                        className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                    >
                        Sight Seeing
                    </NavLink>
                    <NavLink
                        href={route("SighnUser")}
                        className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                    >
                        Request as
                    </NavLink>
                    <NavLink
                        href={route("welcome.hotel")}
                        className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                    >
                        Hotel
                    </NavLink>
                    <NavLink
                        href={route("welcome.transport")}
                        className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                    >
                        Transport
                    </NavLink>
                    <NavLink
                        href=""
                        className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                    >
                        Contact
                    </NavLink>
                    {user ? (
                        <>
                            <span
                                alt={user.name}
                                className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                            >
                                {user.name}
                            </span>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                            >
                                <i className="pi pi-lock"></i>
                                <span>Logout</span>
                            </Link>
                        </>
                    ) : (
                        <span
                            onClick={() => {
                                router.get("login");
                            }}
                            className="bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                        >
                            Login
                        </span>
                    )}
                </div>
            </div>
            <MyBookings
                visible={isBookingsDialogOpen}
                onHide={() => setIsBookingsDialogOpen(false)}
            />
        </nav>
    );
};

export default Navbar;
