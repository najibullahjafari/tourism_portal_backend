import { Link, router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./content.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Vission from "./Vission";
import Book from "./Booking/Book";

const Hotel = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [visible, setVisible] = useState(false);
    const [bookingVisible, setBookingVisible] = useState(false); // State for booking dialog
    const { data } = usePage().props;

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDialogOpen = (hotel) => {
        setSelectedHotel(hotel);
        setVisible(true);
    };

    const handleDialogClose = () => {
        setVisible(false);
        setSelectedHotel(null);
    };

    const handleBookingOpen = (hotel) => {
        setSelectedHotel(hotel);
        setBookingVisible(true);
    };

    const handleBookingClose = () => {
        setBookingVisible(false);
        setSelectedHotel(null);
    };

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Navbar />

            <div className="hotel-bg grid grid-cols-2 gap-4 justify-center">
                <div className="hotel w-full h-screen flex flex-col items-center justify-center">
                    <h4 className="text-white">
                        The Best Place Is Chosen By The Best One!
                    </h4>
                    <div className="flex p-1 max-w-max">
                        <input
                            type="search"
                            placeholder="Search Hotel"
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
            </div>

            <div className="hotel-list caret-indigo-400 items-center grid grid-cols-3 gap-3 justify-center">
                {filteredData.map((item) => (
                    <div
                        className="relative grid grid-cols-2 gap-4 items-center justify-start flex-col my-5 mx-5 max-w-sm m-2 bg-white overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out"
                        key={item.id}
                    >
                        <div className="relative w-full grid bg-neutral-400 grid-cols-2 gap-4">
                            {item.photoAddress.length > 0 ? (
                                <Carousel
                                    showThumbs={false}
                                    infiniteLoop
                                    useKeyboardArrows
                                >
                                    {item.photoAddress
                                        .split(",")
                                        .map((image, index) => (
                                            <div key={index}>
                                                <img
                                                    src={image}
                                                    alt={`Image ${index + 1}`}
                                                    className="hotel_image hover:filter-none w-full h-96 object-cover rounded"
                                                />
                                            </div>
                                        ))}
                                </Carousel>
                            ) : (
                                <img
                                    src={item.photoAddress}
                                    alt="Hotel"
                                    className="w-full hotel_image object-cover rounded"
                                />
                            )}

                            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
                                <h3 className="text-lg text-gray-300 font-bold mb-2">
                                    {item.name}
                                </h3>
                                <p className="text-gray-300">{item.province}</p>
                            </div>
                        </div>
                        <div className="">
                            <Button
                                className="mx-3 my-3 font-bold p-1 text-sm rounded-tl-full rounded-bl-full focus:outline-none focus:shadow-outline"
                                onClick={() => handleDialogOpen(item)}
                            >
                                See more
                            </Button>
                            <Button
                                className="mx-3 my-3 font-bold p-1 text-sm rounded-tr-full rounded-br-full focus:outline-none focus:shadow-outline"
                                onClick={() => handleBookingOpen(item)}
                            >
                                Book
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedHotel && (
                <Dialog
                    header="Hotel Details"
                    visible={visible}
                    style={{ width: "50vw" }}
                    modal
                    onHide={handleDialogClose}
                >
                    <div className="hotel-details">
                        <Carousel
                            showThumbs={false}
                            infiniteLoop
                            useKeyboardArrows
                        >
                            {selectedHotel.photoAddress
                                .split(",")
                                .map((image, index) => (
                                    <div key={index}>
                                        <img
                                            src={image}
                                            alt={`Image ${index + 1}`}
                                            className="hotel_image w-full h-96 object-cover rounded mb-4"
                                        />
                                    </div>
                                ))}
                        </Carousel>
                        <h3 className="text-lg font-bold mb-2">
                            Name: {selectedHotel.name}
                        </h3>
                        <p className="mb-4">Address: {selectedHotel.address}</p>
                        <p className="mb-4">
                            Province: {selectedHotel.province}
                        </p>
                        <p className="mb-4">Phone: 0793647446</p>
                        <div className="flex flex-row justify-between">
                            <Button
                                label="Book"
                                className="p-button-success"
                                onClick={() => handleBookingOpen(selectedHotel)}
                            />
                            <a
                                className="justify-center align-middle"
                                href={`skype:$'{0793647446}?call`}
                            >
                                <i
                                    style={{ fontSize: "2rem" }}
                                    className="pi pi-phone p-2 "
                                />
                            </a>
                        </div>
                    </div>
                </Dialog>
            )}

            {selectedHotel && (
                <Dialog
                    header="Book Hotel"
                    visible={bookingVisible}
                    style={{ width: "50vw" }}
                    modal
                    onHide={handleBookingClose}
                >
                    <Book id={selectedHotel.id} objType="hotel" />
                </Dialog>
            )}

            <Vission />
            <Footer />
        </>
    );
};

export default Hotel;
