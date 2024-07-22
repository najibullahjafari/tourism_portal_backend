import Layout from "@/Layouts/layout/layout";
import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const SightSeeing = () => {
    const { data } = usePage().props;
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("");
    const [selectedSightSeeing, setSelectedSeeing] = useState(null);
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const handleDelete = (id) => {
        router.delete(`/sightSeeing/${id}`);
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

    const actionTemplate = (rowData) => (
        <div className="flex space-x-2">
            <Button
                onClick={() =>
                    router.get(`/sightSeeingDashboard/${rowData.id}`)
                }
                className="p-button-success"
            >
                Visit
            </Button>
            <Button
                onClick={() => confirmAction(rowData.id, handleDelete)}
                icon="pi pi-times"
                className="p-button-danger"
            />
            <Button
                icon="pi pi-eye"
                onClick={() => {
                    setSelectedSeeing(rowData);
                    setVisible(true);
                }}
                className="p-button-info"
            />
        </div>
    );

    const imageTemplate = (rowData) => (
        <img
            src={rowData.image}
            alt="Image"
            className="w-20 object-cover rounded"
        />
    );

    return (
        <Layout>
            <div className="card">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        icon="pi pi-plus"
                        severity="success"
                        onClick={() => router.get("/addSightSeeing")}
                        className="px-4 py-2 rounded"
                    >
                        <span className="ml-2">Add </span>
                    </Button>

                    <form className="flex space-x-2 items-center">
                        <select
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                            <option value="province">Province</option>
                        </select>
                        <input
                            type="search"
                            required
                            name="q"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
                        >
                            Search
                        </Button>
                    </form>
                </div>

                <Toast ref={toast} />
                <ConfirmDialog />

                <DataTable value={data} className="p-datatable-gridlines">
                    <Column field="id" header="ID" sortable />
                    <Column field="name" header="Name" sortable />
                    <Column field="address" header="Address" sortable />
                    <Column field="province" header="Province" sortable />
                    <Column field="open_time" header="Open Time" sortable />
                    <Column field="close_time" header="Close Time" sortable />
                    <Column body={imageTemplate} header="Image" />
                    <Column body={actionTemplate} header="Actions" />
                </DataTable>

                {selectedSightSeeing && (
                    <Dialog
                        visible={visible}
                        modal
                        onHide={() => setVisible(false)}
                        header="Sight Seeing Details"
                    >
                        <div className="flex flex-column px-8 py-5 gap-4">
                            <div>
                                <h2>Sight Seeing:</h2>
                                <img
                                    src={selectedSightSeeing.image}
                                    alt=""
                                    className="rounded border p-2"
                                />
                            </div>
                            <div>
                                <h2>Name</h2>
                                <p>{selectedSightSeeing.name}</p>
                            </div>
                            <div>
                                <h2>Address</h2>
                                <p>{selectedSightSeeing.address}</p>
                            </div>
                            <div>
                                <h2>Province</h2>
                                <p>{selectedSightSeeing.province}</p>
                            </div>
                            <div>
                                <h2>Close Time</h2>
                                <p>{selectedSightSeeing.close_time}</p>
                            </div>
                            <div>
                                <h2>Open Time</h2>
                                <p>{selectedSightSeeing.open_time}</p>
                            </div>
                            <div>
                                <h2>Description</h2>
                                <p>{selectedSightSeeing.description}</p>
                            </div>
                        </div>
                    </Dialog>
                )}
            </div>
        </Layout>
    );
};

export default SightSeeing;
