import Layout from "@/Layouts/layout/layout";
import { router, useForm, usePage } from "@inertiajs/react";
import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const TourGuideRequest = (props) => {
    const { data } = usePage().props;
    const { delete: destroy } = useForm();

    const [q, setQ] = useState("");
    const [category, setCategory] = useState("");
    const toast = useRef(null);

    const handleDelete = (id) => {
        router.delete(`/userRequest/${id}`);
        toast.current.show({
            severity: "danger",
            summary: "Delete",
            detail: "You have deleted the request",
            life: 3000,
        });
    };

    const handleAccept = (id) => {
        router.post(`/userRequest/${id}`);
        toast.current.show({
            severity: "success",
            summary: "Accept",
            detail: "You have Accepted the request",
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

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-1 justify-content-center">
                <Button
                    icon="pi pi-check"
                    className="p-button-rounded p-button-success p-mr-2"
                    onClick={() => confirmAction(rowData.id, handleAccept)}
                />
                <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-danger"
                    onClick={() => confirmAction(rowData.id, handleDelete)}
                />
            </div>
        );
    };

    const imageBodyTemplate = (rowData, field) => {
        return (
            <img
                src={rowData[field]}
                alt={field}
                className="w-20 object-cover rounded"
            />
        );
    };

    return (
        <Layout>
            <div className="card">
                <div className="relative overflow-x-auto shadow-x sm:rounded-lg  ">
                    <div className="flex items-center justify-between">
                        <Button
                            icon="pi pi-plus"
                            severity="success"
                            onClick={() => router.get("/addUser")}
                            className="px-2 py-2 rounded m-3"
                        >
                            <span className="mx-2">User</span>
                        </Button>
                        <form className="box-content   my-5">
                            <select
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mx-2 my-2 w-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="id">ID</option>
                                <option value="name">Name</option>
                                <option value="phone">Phone</option>
                                <option value="userType">User Type</option>
                            </select>
                            <input
                                type="search"
                                required
                                name="q"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                className="w-4 mx-2 my-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="mx-2 my-2 px-4 py-2 bg-primary rounded-md"
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
                        className="p-datatable-customers"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        tableStyle={{ minWidth: "50rem" }}
                    >
                        <Column field="id" header="ID" sortable />
                        <Column field="name" header="Name" sortable />
                        <Column
                            field="father_name"
                            header="Father Name"
                            sortable
                        />
                        <Column
                            body={(rowData) =>
                                imageBodyTemplate(rowData, "image")
                            }
                            header="Photo"
                        />
                        <Column
                            body={(rowData) =>
                                imageBodyTemplate(rowData, "passport")
                            }
                            header="Passport"
                        />
                        <Column field="location" header="Location" sortable />
                        <Column field="phone" header="Phone" sortable />
                        <Column field="userType" header="User Type" sortable />
                        <Column body={actionBodyTemplate} header="Actions" />
                    </DataTable>
                </div>
            </div>
        </Layout>
    );
};

export default TourGuideRequest;
