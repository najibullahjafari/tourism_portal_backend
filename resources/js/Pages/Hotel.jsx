import { Link, router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import React, { useState } from "react";
import "./content.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Hotel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data } = usePage().props;
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <nav className="sticky top-0 z-10 bg-white py-2 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="container mx-auto py-4 flex justify-between items-center">
                        <div>
                            <Link to="/" className="flex-shrink-0">
                                <img
                                    className="h-8 w-auto"
                                    src="images\logo\logo.png"
                                    alt="Tourism Portal"
                                />
                            </Link>
                        </div>
                        <div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link
                                        href={route("welcome.sightSeeing")}
                                        className="px-3 py-2 rounded-md text-sm font-medium  text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        Sight Seeing
                                    </Link>
                                    <Link
                                        href={route("welcome.hotel")}
                                        className="px-3 py-2 rounded-md text-sm font-medium bg-gray-900 text-white"
                                    >
                                        Hotel
                                    </Link>
                                    <Link
                                        href={route("welcome.tourGuide")}
                                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        Tour Guide
                                    </Link>
                                    <Link
                                        to="/about"
                                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        Transport
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button
                                onClick={() => {
                                    router.get("login");
                                }}
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Login
                            </Button>
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
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href={route("welcome.sightSeeing")}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            Sight Seeing
                        </Link>
                        <Link
                            href={route("welcome.tourGuide")}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            Tour Guide
                        </Link>
                        <Link
                            href={route("welcome.hotel")}
                            className="block px-3 py-2 rounded-md text-base font-medium bg-gray-900 text-white "
                        >
                            Hotel
                        </Link>
                        <Link
                            to="/about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            Transport
                        </Link>
                        <Link
                            to="/contact"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="main-hotel w-full h-screen"></div>

            <div className="flex items-center justify-between w-1/2 bg-white rounded-lg px-6 py-6 mt-6">
                <form>
                    <input
                        type="search"
                        placeholder="Search Hotel"
                        className="search"
                        name="q"
                    />
                    <Button
                        icon="pi pi-search"
                        className="px-5 py-2 mx-3"
                    ></Button>
                </form>
            </div>
            <div className="split"></div>
            {data.map((item) => (
                <div
                    className="card flex flex-row w-1/2 bg-white items-center my-4 py-0 h-max rounded-lg shadow-lg"
                    key={item.id}
                >
                    <img
                        src={item.photoAddress}
                        alt="image"
                        className="h-full w-1/3 rounded-lg"
                    />
                    <span className="my-1 mx-2">
                        <h4>{item.name}</h4>
                        <p>{item.province}</p>
                    </span>
                    <Button
                        icon="pi pi-info-circle"
                        className="button h-full w-0.5 mr-0 py-1 px-3"
                    ></Button>
                </div>
            ))}
            <Footer />
        </div>
    );
};

export default Hotel;
