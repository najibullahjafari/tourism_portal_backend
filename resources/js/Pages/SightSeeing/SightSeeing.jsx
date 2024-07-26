import Layout from "@/Layouts/layout/layout";
import React, { useState, useRef } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useReactToPrint } from "react-to-print";

const SightSeeing = () => {
    const { data } = usePage().props;
    console.log(data);
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("");
    const [selectedSightSeeing, setSelectedSeeing] = useState(null);
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const printRef = useRef();

    const handleDelete = (id) => {
        router.delete(`/sightSeeingRequestDelete/${id}`);
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
                icon="pi pi-pencil"
                className="p-button-success"
            ></Button>
            <Button
                onClick={() => confirmAction(rowData.id, handleDelete)}
                icon="pi pi-trash"
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
            <Button
                onClick={() => router.get(`/sightSeeingNews/${rowData.id}`)}
                key={rowData.id}
                className="p-button-success"
            >
                News
            </Button>
        </div>
    );

    const imageTemplate = (rowData) => {
        const imagesArray =
            rowData.image && typeof rowData.image === "string"
                ? rowData.image.split(",")
                : [];
        const firstImage =
            imagesArray.length > 0 ? imagesArray[0] : rowData.image;

        return (
            <div className="flex">
                <img
                    src={firstImage}
                    alt="Image"
                    className="w-20 object-cover rounded mr-2"
                />
            </div>
        );
    };

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

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
                <div ref={printRef}>
                    <DataTable value={data} className="p-datatable-gridlines">
                        <Column field="id" header="ID" sortable />
                        <Column field="name" header="Name" sortable />
                        <Column field="address" header="Address" sortable />
                        <Column field="province" header="Province" sortable />
                        <Column field="open_time" header="Open Time" sortable />
                        <Column
                            field="close_time"
                            header="Close Time"
                            sortable
                        />
                        <Column body={imageTemplate} header="Image" />
                        <Column body={actionTemplate} header="Actions" />
                    </DataTable>
                </div>
                <Button
                    onClick={handlePrint}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
                >
                    Print as PDF
                </Button>
                {selectedSightSeeing && (
                    <Dialog
                        visible={visible}
                        modal
                        onHide={() => setVisible(false)}
                        header="Sight Seeing Details"
                        className="instagram-post-dialog"
                    >
                        <div className="flex flex-row px-8 py-5 gap-4 bg-white">
                            <div className="w-5 overflow-hidden rounded-lg">
                                <img
                                    src={selectedSightSeeing.image}
                                    alt=""
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-2xl font-bold mb-2">
                                    {selectedSightSeeing.name}
                                </h2>
                                <p className="text-lg mb-2">
                                    {selectedSightSeeing.address}
                                </p>
                                <p className="text-lg mb-2">
                                    {selectedSightSeeing.province}
                                </p>
                                <p className="text-lg mb-2">
                                    Open: {selectedSightSeeing.open_time} -
                                    Close: {selectedSightSeeing.close_time}
                                </p>
                                <p className="text-lg text-gray-700">
                                    {selectedSightSeeing.description}
                                </p>
                            </div>
                        </div>
                    </Dialog>
                )}
            </div>
        </Layout>
    );
};

export default SightSeeing;
