import { Link, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import React, { useState } from "react";
import "./content.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TourGuide = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data } = usePage().props;
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="flex flex-col items-center justify-center">
            <Navbar></Navbar>
            <div className="main-tour-guide w-full h-screen"></div>

            <div className="flex items-center justify-between w-1/2 bg-white rounded-lg px-6 py-6 mt-6">
                <form>
                    <input
                        type="search"
                        placeholder="Search Tour Guide"
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
                        src={item.image}
                        alt="image"
                        className="h-full w-1/3 rounded-lg"
                    />
                    <span className="my-1 mx-2">
                        <h4>{item.name}</h4>
                        <p>{item.bio}</p>
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

export default TourGuide;
