import Layout from "@/Layouts/layout/layout";
import React, { useState, useRef } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const HotelList = () => {
    const { data } = usePage().props;
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("");
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const handleDelete = (id) => {
        router.delete(`/hotels/${id}`);
        toast.current.show({
            severity: "danger",
            summary: "Delete",
            detail: "You have deleted the request",
            life: 3000,
        });
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

    if (!data) {
        return <div className="fa fa-user">Loading...</div>;
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button
                    icon="pi pi-eye"
                    className="p-button-success"
                    onClick={() => {
                        setSelectedHotel(rowData);
                        setVisible(true);
                    }}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => confirmAction(rowData.id, handleDelete)}
                />
            </div>
        );
    };

    return (
        <Layout>
            <div className="card">
                <div className="relative overflow-x-auto shadow-x sm:rounded-lg ">
                    <div className="flex items-center justify-between">
                        <div>
                            <Button
                                icon="pi pi-plus"
                                severity="success"
                                onClick={() => {
                                    router.get(`/addFood`);
                                }}
                                className="px-2 py-2 rounded m-3"
                            >
                                <span className="mx-2">Food</span>
                            </Button>
                            <Button
                                icon="pi pi-plus"
                                severity="success"
                                onClick={() => {
                                    router.get(`/addRoom`);
                                }}
                                className="px-2 py-2 rounded m-3"
                            >
                                <span className="mx-2">Room</span>
                            </Button>
                        </div>
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
                                <option value="name">Name</option>
                                <option value="province">Province</option>
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
                    <DataTable
                        value={data}
                        paginator
                        rows={10}
                        className="datatable-responsive"
                    >
                        <Column field="id" header="ID" sortable />
                        <Column field="name" header="Name" sortable />
                        <Column field="address" header="Address" sortable />
                        <Column field="province" header="Province" sortable />
                        <Column
                            field="photoAddress"
                            header="Image"
                            body={(rowData) => (
                                <img
                                    src={rowData.photoAddress}
                                    alt="Image"
                                    className="w-20 object-cover rounded"
                                />
                            )}
                        />
                        <Column
                            header="Visit"
                            body={(rowData) => (
                                <Button
                                    icon="pi pi-pencil"
                                    onClick={() =>
                                        router.get(
                                            `/HotelDashboard/${rowData.id}`
                                        )
                                    }
                                    className="p-button-primary"
                                ></Button>
                            )}
                        />
                        <Column
                            header="Action Hotel"
                            body={actionBodyTemplate}
                        />
                    </DataTable>
                    {selectedHotel && (
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
                                    <h2>Name: {selectedHotel.name}</h2>
                                    <p>Address: {selectedHotel.address}</p>
                                    <p>Province: {selectedHotel.province}</p>
                                    <div>
                                        <p>Hotel:</p>
                                        <img
                                            src={selectedHotel.photoAddress}
                                            width={400}
                                            height={50}
                                            alt="Hotel"
                                            className="rounded border p-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default HotelList;
