import { Link, router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import React, { useState } from "react";
import "./content.css";
import Footer from "./Footer";
const SightSeeing = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data } = usePage().props;
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    console.log(data);
    return (
        <div className="flex flex-col items-center justify-center">
            <nav className="sticky top-0 z-10 bg-white w-full">
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
                            className="block px-3 py-2 rounded-md text-base font-medium bg-gray-900 text-white"
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
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
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
            <div className="sightSeeing w-full h-screen flex flex-col items-center justify-center">
                <h4 className="text-gray-100">Nature Nook Afghanistan</h4>
                <div className="flex p-1 max-w-max pl-7 ">
                    <form>
                        <input
                            type="search"
                            placeholder="Search Sight Seeing"
                            className="search rounded-lg px-5 py-2 mx-3"
                            name="q"
                        />
                        <Button
                            icon="pi pi-search"
                            className="px-5 py-2 mx-3"
                        ></Button>
                    </form>
                </div>
            </div>

            <div class="sight-seeing-list my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-5 m-2">
                {data.map((item) => (
                    <div
                        class="max-w-sm m-2 bg-white overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out"
                        key={item.id}
                    >
                        <img
                            class="w-full h-48 object-cover border-2 border-white rounded-lg"
                            src={item.image}
                        />
                        <div class="p-4">
                            <h3 class="text-lg font-bold mb-2">{item.name}</h3>
                            <p class="text-gray-600">{item.description}</p>
                        </div>

                        <div>
                            <button
                                className="mx-3 my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() =>
                                    router.get(`/SightSeeingDetial/${item.id}`)
                                }
                                icon="pi pi-plus"
                            ></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SightSeeing;
