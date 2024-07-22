import Layout from "@/Layouts/layout/layout";
import React, { useState, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const UserList = () => {
    const { data } = usePage().props;
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const handleDelete = (id) => {
        router.delete(`/user/${id}`);
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

    const imageBodyTemplate = (rowData, field) => {
        return (
            <img
                src={rowData[field]}
                className="w-20 object-cover rounded"
                alt="Image"
            />
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="mx-3 grid grid-cols-2 gap-1">
                <Button
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => confirmAction(rowData.id, handleDelete)}
                />
                <Button
                    icon="pi pi-eye"
                    severity="success"
                    onClick={() => {
                        setSelectedUser(rowData);
                        setVisible(true);
                    }}
                />
            </div>
        );
    };

    const dialogFooter = (
        <div className="flex justify-end">
            <Button
                label="Close"
                icon="pi pi-times"
                onClick={() => setVisible(false)}
            />
        </div>
    );

    if (!data) {
        return <div className="fa fa-user">Loading...</div>;
    }

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
                        responsiveLayout="scroll"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        tableStyle={{ minWidth: "50rem" }}
                    >
                        <Column field="id" header="ID" sortable />
                        <Column field="name" header="Name" sortable />
                        <Column field="father_name" header="Father Name" />
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
                        <Column field="userType" header="User Type" />
                        <Column
                            body={(rowData) => (
                                <Button
                                    label="Edit"
                                    className="p-button-success"
                                    onClick={() =>
                                        router.post(
                                            `/userProfile/${rowData.id}`
                                        )
                                    }
                                />
                            )}
                            header="Edit"
                        />
                        <Column body={actionBodyTemplate} header="Action" />
                    </DataTable>
                    {selectedUser && (
                        <Dialog
                            visible={visible}
                            modal
                            onHide={() => setVisible(false)}
                            footer={dialogFooter}
                            header="User Details"
                        >
                            <div className="flex flex-column px-8 py-5 gap-4">
                                <h2>Name: {selectedUser.name}</h2>
                                <p>Father Name: {selectedUser.father_name}</p>
                                <p>ID Card: {selectedUser.id_card}</p>
                                <p>Location: {selectedUser.location}</p>
                                <p>Phone No: {selectedUser.phone}</p>
                                <p>User Type: {selectedUser.userType}</p>
                                <div>
                                    <p>{selectedUser.name}:</p>
                                    <img
                                        src={selectedUser.image}
                                        width={400}
                                        height={50}
                                        alt="Profile"
                                        className="rounded border p-2"
                                    />
                                </div>
                                <div>
                                    <p>Passport:</p>
                                    <img
                                        src={selectedUser.passport}
                                        width={400}
                                        height={50}
                                        alt="passport"
                                        className="rounded border p-2"
                                    />
                                </div>
                                <p>{selectedUser.bio}</p>
                            </div>
                        </Dialog>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default UserList;
