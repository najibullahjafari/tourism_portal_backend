import Layout from "@/Layouts/layout/layout";
import React, { useState, useRef } from "react";
import { usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { router } from "@inertiajs/react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const requestedCars = () => {
    const { data } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const toast = useRef(null);

    const acceptCar = (id) => {
        router.post(`/car/accepted/${id}`);
        toast.current.show({
            severity: "info",
            summary: "Confirmed",
            detail: "You have accepted the request",
            life: 3000,
        });
    };

    const rejectCar = (id) => {
        router.post(`/car/rejected/${id}`);
        toast.current.show({
            severity: "warn",
            summary: "Rejected",
            detail: "You have rejected the request",
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

    const imageBodyTemplate = (rowData) => {
        return (
            <img
                src={rowData.image}
                alt="Car"
                height={100}
                width={100}
                className="border object-cover rounded"
            />
        );
    };

    const viewButtonTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-eye"
                className="p-button-rounded p-button-text"
                onClick={() => {
                    setSelectedCar(rowData);
                    setVisible(true);
                }}
            />
        );
    };

    const actionButtonTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button
                    icon="pi pi-check"
                    className="p-button-rounded p-button-success p-button-text"
                    onClick={() => confirmAction(rowData.id, acceptCar)}
                />
                <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-danger p-button-text"
                    onClick={() => confirmAction(rowData.id, rejectCar)}
                />
            </div>
        );
    };

    if (!data) {
        return <div className="fa fa-user">Loading...</div>;
    }

    return (
        <Layout>
            <div className="shadow-md rounded-xl">
                <Toast ref={toast} />
                <ConfirmDialog />
                <div className="flex justify-content-between items-center m-3">
                    <h2>The Requested Transportation services (Cars)</h2>
                </div>

                <DataTable
                    value={data}
                    paginator
                    rows={10}
                    className="p-datatable-gridlines"
                    emptyMessage="No cars found."
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: "50rem" }}
                >
                    <Column field="id" header="ID" sortable />
                    <Column field="name" header="Name" sortable />
                    <Column field="phone" header="Phone" sortable />
                    <Column body={imageBodyTemplate} header="Image" />
                    <Column body={viewButtonTemplate} header="View" />
                    <Column body={actionButtonTemplate} header="Action" />
                </DataTable>

                {selectedCar && (
                    <Dialog
                        visible={visible}
                        modal
                        onHide={() => setVisible(false)}
                    >
                        <div>
                            <div className="px-8 py-5">
                                <h2>Name: {selectedCar.name}</h2>
                                <p>Driver Phone: {selectedCar.phone}</p>
                                <p>Address: {selectedCar.location}</p>
                                <div>
                                    <p>Car:</p>
                                    <img
                                        src={selectedCar.image}
                                        width={400}
                                        height={50}
                                        alt="Car"
                                        className="rounded border p-2"
                                    />
                                </div>
                                <div>
                                    <p>Passport:</p>
                                    <img
                                        width={400}
                                        height={50}
                                        src={selectedCar.passport}
                                        alt="Passport"
                                        className="rounded border p-2"
                                    />
                                </div>
                                <Button
                                    icon="pi pi-check"
                                    className="bg-slate-400 p-button-rounded p-button-success p-button-text"
                                    onClick={() =>
                                        confirmAction(selectedCar.id, acceptCar)
                                    }
                                />
                                Accept
                                <Button
                                    icon="pi pi-times"
                                    className="p-button-rounded p-button-danger p-button-text"
                                    onClick={() =>
                                        confirmAction(selectedCar.id, rejectCar)
                                    }
                                />
                                Reject
                            </div>
                        </div>
                    </Dialog>
                )}
            </div>
        </Layout>
    );
};

export default requestedCars;
