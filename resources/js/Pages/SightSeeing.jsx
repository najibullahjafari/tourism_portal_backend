import { Link, router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./content.css";
import Footer from "./Footer";
import Vission from "./Vission";
import Navbar from "./Navbar";

const SightSeeing = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSight, setSelectedSight] = useState(null);
    const [visible, setVisible] = useState(false);
    const [travelVisible, setTravelVisible] = useState(false);
    const [hotels, setHotels] = useState([]);
    const { data } = usePage().props;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDialogOpen = async (sight) => {
        setSelectedSight(sight);
        setVisible(true);
        // Fetch hotels related to the selected sight-seeing
        const response = fetch(`dependedHotelSightSeeing/${sight.id}`);
        const hotelsData = response.json();
        console.log(hotelsData, "hotels");
        setHotels(hotelsData.data);
    };

    const fetchBookings = async () => {
        try {
            const response = await fetch("getBooking");
            const data = await response.json();
            console.log(data, "bookings");
            setBookings(data.data); // Adjusted to access the data array
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const handleDialogClose = () => {
        setVisible(false);
        setSelectedSight(null);
        setHotels([]); // Clear hotels data when dialog is closed
    };

    const handleTravelDialogOpen = () => {
        setTravelVisible(true);
    };

    const handleTravelDialogClose = () => {
        setTravelVisible(false);
    };

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Navbar />

            <div className="grid grid-cols-2 gap-4 justify-center">
                <div className="sightSeeing w-full h-screen flex flex-col items-center justify-center">
                    <div className="flex p-1 max-w-max">
                        <input
                            type="search"
                            placeholder="Search Sight Seeing"
                            className="search text-black rounded-lg px-5 py-2 mx-3"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <Button
                            icon="pi pi-search"
                            className="px-5 py-2 mx-3"
                        ></Button>
                    </div>
                </div>
                <div className="sight-seeing-list caret-indigo-400 items-center grid grid-cols-3 gap-3 justify-center">
                    {filteredData.map((item) => (
                        <div
                            className="relative grid grid-cols-2 gap-4 items-center justify-start flex-col my-5 mx-5 max-w-sm m-2 bg-white overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out"
                            key={item.id}
                        >
                            <div className="relative w-full grid bg-neutral-400 grid-cols-2 gap-4">
                                {item.image.length > 0 ? (
                                    <Carousel
                                        showThumbs={false}
                                        infiniteLoop
                                        useKeyboardArrows
                                    >
                                        {item.image
                                            .split(",")
                                            .map((image, index) => (
                                                <div key={index}>
                                                    <img
                                                        src={image}
                                                        alt={`Image ${
                                                            index + 1
                                                        }`}
                                                        className="sight_seeing_image hover:filter-none w-full h-96 object-cover rounded"
                                                    />
                                                </div>
                                            ))}
                                    </Carousel>
                                ) : (
                                    <img
                                        src={item.image}
                                        alt="Sight Seeing"
                                        className="w-full sight_seeing_image object-cover rounded"
                                    />
                                )}

                                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
                                    <h3 className="text-lg text-gray-300 font-bold mb-2">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-300">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                            <div className="">
                                <Button
                                    className="mx-3 my-3 font-bold p-1 text-sm   focus:outline-none focus:shadow-outline"
                                    onClick={() => handleDialogOpen(item)}
                                >
                                    See more
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedSight && (
                <Dialog
                    header="Sight Seeing Details"
                    visible={visible}
                    style={{ width: "50vw" }}
                    modal
                    onHide={handleDialogClose}
                >
                    <div className="sight-seeing-details">
                        <h3 className="text-lg font-bold mb-2">
                            Name: {selectedSight.name}
                        </h3>
                        <p className="mb-4">
                            Description: {selectedSight.description}
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            {selectedSight.image
                                .split(",")
                                .map((image, index) => (
                                    <div key={index} className="">
                                        <img
                                            src={image}
                                            alt={`Image ${index + 1}`}
                                            className="sight_seeing_image w-48 h-48 object-cover rounded mb-4"
                                        />
                                    </div>
                                ))}
                        </div>

                        <Button
                            label="Travel"
                            className="p-button-success"
                            onClick={handleTravelDialogOpen}
                        />
                    </div>
                </Dialog>
            )}

            <Dialog
                header="Travel Options"
                visible={travelVisible}
                style={{ width: "50vw" }}
                modal
                onHide={handleTravelDialogClose}
            >
                <div className="travel-options">
                    <Link
                        to="/about"
                        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white"
                    >
                        Available cars
                    </Link>
                    {/* Display hotels fetched from the backend */}
                    <Link
                        href={route("welcome.hotel")}
                        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white"
                    >
                        Available hotels
                    </Link>
                </div>
            </Dialog>

            <Vission />
            <Footer />
        </>
    );
};

export default SightSeeing;
