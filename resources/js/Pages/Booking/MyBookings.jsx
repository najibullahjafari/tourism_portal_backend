import React, { useEffect, useState } from "react";
import { usePage, router } from "@inertiajs/react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const MyBookings = ({ visible, onHide }) => {
    const { user } = usePage().props;
    console.log(user);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (visible) {
            fetchBookings();
        }
    }, [visible]);

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

    const cancelBooking = async (id) => {
        try {
            await router.delete(`/cancelBook/${id}`);
            setBookings((prevBookings) =>
                prevBookings.filter((booking) => booking.id !== id)
            );
        } catch (error) {
            console.error("Error cancelling booking:", error);
        }
    };

    return (
        <Dialog
            header="My Bookings"
            visible={visible}
            style={{ width: "50vw" }}
            onHide={onHide}
        >
            {bookings.length > 0 ? (
                <ul className="list-none p-0">
                    {bookings.map((booking) => (
                        <li key={booking.id} className="mb-4">
                            <div className="p-4 border rounded shadow">
                                <p className="text-lg font-semibold mb-2">
                                    <strong>Type:</strong> {booking.obj_type}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>ID:</strong> {booking.obj_id}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Date:</strong>{" "}
                                    {new Date(
                                        booking.start_date
                                    ).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Created At:</strong>{" "}
                                    {new Date(
                                        booking.created_at
                                    ).toLocaleString()}
                                </p>
                                <Button
                                    label="Cancel"
                                    className="p-button-danger mt-2"
                                    onClick={() => cancelBooking(booking.id)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex justify-center items-center h-32">
                    <i className="pi pi-spin pi-spinner text-4xl text-primary"></i>
                </div>
            )}
        </Dialog>
    );
};

export default MyBookings;
