import { Link, router } from "@inertiajs/react";
import { Button } from "primereact/button";
import React, { useState } from "react";

const Navbar = ({ children }) => {
    const [activeLink, setActiveLink] = useState("sightSeeing");
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
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
                                    className="px-3 py-2 rounded-md text-sm font-medium bg-gray-900 text-white"
                                >
                                    Sight Seeing
                                </Link>
                                <Link
                                    href={route("welcome.hotel")}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
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
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link
                        to="/"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                            activeLink === "sightSeeing"
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                        onClick={() => handleLinkClick("sightSeeing")}
                    >
                        Sight Seeing
                    </Link>
                    <Link
                        to="/destinations"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                            activeLink === "tourGuide"
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                        onClick={() => handleLinkClick("tourGuide")}
                    >
                        Tour Guide
                    </Link>
                    <Link
                        to="/packages"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                            activeLink === "hotel"
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                        onClick={() => handleLinkClick("hotel")}
                    >
                        Hotel
                    </Link>
                    <Link
                        to="/about"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                            activeLink === "transport"
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                        onClick={() => handleLinkClick("transport")}
                    >
                        Transport
                    </Link>
                    <Link
                        to="/contact"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                            activeLink === "contact"
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                        onClick={() => handleLinkClick("contact")}
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
