import { Link, router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import React, { useState } from "react";
import "./content.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Vission from "./Vission";

const TourGuide = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data } = usePage().props;
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Filter data to show only people with the role "tourist"
    const tourists = data.filter((item) => item.role === "tourist");

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center">
                <div
                    className="tour-guide w-full h-screen flex flex-col items-center justify-center bg-cover bg-center"
                    style={{
                        backgroundImage: "url(/path/to/your/background.jpg)",
                    }}
                >
                    <h4 className="text-white text-4xl font-bold mb-4">
                        Afghanistan
                    </h4>
                    <h4 className="text-white text-2xl mb-8">
                        Discover the world with an expert by your side.
                    </h4>
                    <div className="flex p-1 max-w-max pl-7">
                        <form className="flex">
                            <input
                                type="search"
                                placeholder="Search Tour Guide"
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
                <div className="sight-seeing-list my-8 mx-5 flex flex-row justify-center items-center flex-wrap m-2">
                    {tourists.map((item) => (
                        <div
                            className="flex items-center justify-center flex-col my-5 mx-5 max-w-sm m-2 bg-white overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out"
                            key={item.id}
                        >
                            <img
                                className="w-full h-48 object-cover border-2 border-white rounded-lg"
                                src={item.image}
                                alt={item.name}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2">
                                    {item.name}
                                </h3>
                                <p className="text-gray-600">{item.bio}</p>
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    className="mx-3 my-3 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                                    onClick={() =>
                                        router.get(
                                            `/tourGuideDetail/${item.id}`
                                        )
                                    }
                                    icon="pi pi-eye"
                                ></Button>
                                <Button
                                    className="mx-3 my-3 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                                    onClick={() =>
                                        router.get(
                                            `/booking/obj/${item.id}?type=tourguide`
                                        )
                                    }
                                >
                                    Book
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Vission />
            <Footer />
        </>
    );
};

export default TourGuide;
