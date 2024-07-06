import { Link, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import React, { useState } from "react";
import "./content.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
const SightSeeing = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data } = usePage().props;
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <Navbar>
                {" "}
                <Link
                    to="/"
                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                    Hotel
                </Link>
            </Navbar>
            {/* <div className="main-sightSeeing w-full h-screen"></div> */}

            <div className="flex p-1 w-full pl-7 bg-white rounded-lg">
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
            <div className="split"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 sightseeing-place-container gap-4 m-2">
                {data.map((item) => (
                    <div class="max-w-sm m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img class="rounded-t-lg" src={item.image} alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {item.name}
                                </h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                <p>{item.description}</p>
                            </p>
                            <a
                                href="#"
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Read more
                                <svg
                                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default SightSeeing;
