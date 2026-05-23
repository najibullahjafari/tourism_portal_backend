import { Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./Content.css";
import Footer from "./Footer";
import Vission from "./Vission";
import Navbar from "./Navbar";
import Book from "./Booking/Book"; // Import the Book component

const CarView = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [bookingVisible, setBookingVisible] = useState(false); // State for booking dialog
    const { cars } = usePage().props;
    console.log(cars);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length);
    };

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + cars.length) % cars.length
        );
    };

    const handleDialogOpen = () => {
        setVisible(true);
    };

    const handleDialogClose = () => {
        setVisible(false);
    };

    const handleBookingOpen = () => {
        setBookingVisible(true);
    };

    const handleBookingClose = () => {
        setBookingVisible(false);
    };

    if (cars.length === 0) {
        return (
            <>
                <Navbar />
                <div className="car-view w-full h-screen flex flex-col items-center justify-center">
                    <p>No cars available</p>
                </div>
                <Vission />
                <Footer />
            </>
        );
    }

    const currentCar = cars[currentIndex];

    return (
        <>
            <Navbar />

            <div className="car-view w-full h-screen flex flex-col items-center justify-center">
                <div className="relative w-96 h-96 max-w-2xl bg-white overflow-hidden rounded-lg shadow-lg">
                    <img
                        src={currentCar.image}
                        alt="Car"
                        className="w-full car_image object-cover rounded"
                    />

                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
                        <h3 className="text-lg text-gray-300 font-bold mb-2">
                            {currentCar.name}
                        </h3>
                        <p className="text-gray-300">
                            {currentCar.description}
                        </p>
                    </div>

                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                        <Button
                            icon="pi pi-chevron-left"
                            className="p-button-rounded p-button-primary"
                            onClick={handlePrev}
                        />
                    </div>
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                        <Button
                            icon="pi pi-chevron-right"
                            className="p-button-rounded p-button-primary"
                            onClick={handleNext}
                        />
                    </div>
                </div>
                <Button
                    label="View Details"
                    className="p-button-primary mt-4"
                    onClick={handleDialogOpen}
                />
            </div>

            <Dialog
                header="Car Details"
                visible={visible}
                style={{ width: "50vw" }}
                modal
                onHide={handleDialogClose}
            >
                <div className="car-details">
                    <img
                        src={currentCar.image}
                        alt="Car"
                        className="w-full car_image object-cover rounded mb-4"
                    />
                    <h3 className="text-lg font-bold mb-2">
                        Name: {currentCar.name}
                    </h3>
                    <h3 className="text-lg font-bold mb-2">
                        Phone Number: {currentCar.phone}
                    </h3>
                    <p className="mb-4">{currentCar.description}</p>
                    <div className="flex flex-row justify-between">
                        <Button
                            label="Book"
                            className="p-button-primary"
                            onClick={handleBookingOpen}
                        />
                        <a
                            className="justify-center text-center"
                            href={`skype:${currentCar.phone}?call`}
                        >
                            <i
                                style={{ fontSize: "2rem" }}
                                className="pi pi-phone w-50 text-center p-2"
                            />
                        </a>
                    </div>
                </div>
            </Dialog>

            <Dialog
                header="Book Car"
                visible={bookingVisible}
                style={{ width: "50vw" }}
                modal
                onHide={handleBookingClose}
            >
                <Book id={currentCar.id} objType="car" />
            </Dialog>

            <Vission />
            <Footer />
        </>
    );
};

export default CarView;
