import React, { useEffect, useState } from "react";
import { usePage, router } from "@inertiajs/react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const MyBookings = ({ visible, onHide }) => {
    const { auth, user: pageUser } = usePage().props;
    const user = pageUser ?? auth?.user ?? null;
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cancelingId, setCancelingId] = useState(null);

    useEffect(() => {
        if (visible) {
            fetchBookings();
        }
    }, [visible]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await fetch("/getBooking");
            const data = await response.json();
            setBookings(data.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (id) => {
        try {
            setCancelingId(id);
            await router.delete(`/cancelBook/${id}`);
            setBookings((prevBookings) =>
                prevBookings.filter((booking) => booking.id !== id)
            );
        } catch (error) {
            console.error("Error cancelling booking:", error);
        } finally {
            setCancelingId(null);
        }
    };

    const visibleBookings = user
        ? bookings.filter((booking) => booking.booker_id === user.id)
        : [];

    return (
        <Dialog
            header="My Bookings"
            visible={visible}
            style={{ width: "min(92vw, 42rem)" }}
            onHide={onHide}
        >
            {!user ? (
                <div className="rounded-2xl bg-slate-50 p-6 text-center">
                    <p className="mb-4 text-slate-700">
                        Sign in to view and manage your bookings.
                    </p>
                    <Button
                        label="Login"
                        className="rounded-xl border-0 bg-slate-900 px-5 py-3 font-semibold text-white"
                        onClick={() => router.get("/login")}
                    />
                </div>
            ) : loading ? (
                <div className="flex h-32 items-center justify-center">
                    <i className="pi pi-spin pi-spinner text-3xl text-emerald-500"></i>
                </div>
            ) : visibleBookings.length > 0 ? (
                <div className="space-y-4">
                    {visibleBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                                        {booking.obj_type}
                                    </p>
                                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                                        Booking #{booking.id}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-600">
                                        <strong>Date:</strong>{" "}
                                        {new Date(
                                            booking.start_date
                                        ).toLocaleString()}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-600">
                                        <strong>Created:</strong>{" "}
                                        {new Date(
                                            booking.created_at
                                        ).toLocaleString()}
                                    </p>
                                </div>
                                <Button
                                    label={
                                        cancelingId === booking.id
                                            ? "Cancelling..."
                                            : "Cancel"
                                    }
                                    disabled={cancelingId === booking.id}
                                    className="rounded-xl border-0 bg-red-500 px-4 py-3 font-semibold text-white"
                                    onClick={() => cancelBooking(booking.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl bg-slate-50 px-6 py-10 text-center">
                    <i className="pi pi-calendar text-4xl text-slate-400"></i>
                    <p className="mt-4 text-slate-700">No bookings yet.</p>
                </div>
            )}
        </Dialog>
    );
};

export default MyBookings;
