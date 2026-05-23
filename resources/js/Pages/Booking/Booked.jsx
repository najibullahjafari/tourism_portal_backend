import Layout from "@/Layouts/layout/layout";
import React, { useState, useRef, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Booked = () => {
    const { auth, user: pageUser } = usePage().props;
    const user = pageUser ?? auth?.user ?? null;
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("");
    const [selectedbooking, setSelectedbooking] = useState(null);
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

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

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleDelete = async (id) => {
        try {
            await router.delete(`/booked/delete/${id}`);
            toast.current.show({
                severity: "danger",
                summary: "Delete",
                detail: "You have deleted the request",
                life: 3000,
            });
            fetchBookings(); // Refetch bookings after deletion
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    const confirmAction = (id, action) => {
        confirmDialog({
            message: "Are you sure you want to proceed?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => action(id),
            reject: () => {
                toast.current.show({
                    severity: "info",
                    summary: "Cancelled",
                    detail: "You have cancelled the action",
                    life: 3000,
                });
            },
        });
    };

    const filteredData = bookings.filter((item) => {
        if (user?.roles?.includes("hotel-admin")) {
            return item.obj_type === "hotel";
        } else if (user?.roles?.includes("transport-admin")) {
            return item.obj_type === "car";
        }
        return false;
    });

    return (
        <Layout>
            <div className="relative overflow-x-auto shadow-x sm:rounded-lg bg-white">
                <div className="flex items-center justify-between">
                    <form className="box-content shadow-sm bg-white my-5">
                        <select
                            name="category"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                            className="mx-2 my-2 w-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <legend>Option</legend>
                            <option value="id">ID</option>
                            <option value="obj_type">Type</option>
                            <option value="start_date">Date</option>
                        </select>
                        <input
                            type="search"
                            required
                            name="q"
                            value={q}
                            onChange={(e) => {
                                setQ(e.target.value);
                            }}
                            className="w-4 mx-2 my-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        ></input>
                        <button
                            type="submit"
                            className=" mx-2 my-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Search
                        </button>
                    </form>
                </div>
                <Toast ref={toast} />
                <ConfirmDialog />
            </div>
            <div className="relative overflow-x-auto shadow-x sm:rounded-lg bg-white mt-5">
                {loading ? (
                    <div className="p-6 text-center text-slate-600">
                        Loading bookings...
                    </div>
                ) : filteredData.length > 0 ? (
                    <DataTable value={filteredData} paginator rows={10}>
                        <Column field="id" header="ID" />
                        <Column field="obj_type" header="Type" />
                        <Column field="start_date" header="Date" />
                        <Column
                            header="Action Booking"
                            body={(rowData) => (
                                <div className="flex flex-col gap-1">
                                    <Button
                                        onClick={() =>
                                            confirmAction(
                                                rowData.id,
                                                handleDelete
                                            )
                                        }
                                        icon="pi pi-times"
                                        className="p-button-danger"
                                    ></Button>
                                    <Button
                                        icon="pi pi-eye"
                                        severity="success"
                                        onClick={() => {
                                            setSelectedbooking(rowData);
                                            setVisible(true);
                                        }}
                                        className="px-2 py-1 rounded"
                                    ></Button>
                                </div>
                            )}
                        />
                    </DataTable>
                ) : (
                    <div>No data available</div>
                )}
                {selectedbooking && (
                    <Dialog
                        visible={visible}
                        modal
                        onHide={() => setVisible(false)}
                    >
                        <div
                            style={{
                                borderRadius: "12px",
                                backgroundColor: "var(--secondary-400)",
                            }}
                        >
                            <div className="flex flex-column px-8 py-5 gap-4">
                                <h2>Type: {selectedbooking.obj_type}</h2>
                                <p>ID: {selectedbooking.obj_id}</p>
                            </div>
                        </div>
                    </Dialog>
                )}
            </div>
        </Layout>
    );
};

export default Booked;
