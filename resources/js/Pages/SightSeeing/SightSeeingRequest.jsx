import Layout from "@/Layouts/layout/layout";
import React, { useState, useRef } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const SightSeeingRequest = () => {
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

    const handleReject = (id) => {
        router.delete(`/sightSeeingRequestDelete/${id}`);
    };
    const handleAccept = (id) => {
        router.post(`/sightSeeingRequest/${id}`);
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
                                    router.get("/addSightSeeing");
                                }}
                                className="px-2 py-2 rounded m-3"
                            >
                                <span className="mx-2">Sight Seeing</span>
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
                <div className="  shadow-x sm:rounded-lg  mt-5">
                    <DataTable
                        value={data}
                        paginator
                        rows={10}
                        selectionMode="single"
                        onSelectionChange={(e) => setSelectedSeeing(e.value)}
                    >
                        <Column field="id" header="ID" />
                        <Column field="name" header="Name" />
                        <Column field="address" header="Address" />
                        <Column field="province" header="Province" />
                        <Column field="open_time" header="Open Time" />
                        <Column field="close_time" header="Close Time" />
                        <Column
                            field="image"
                            header="Image"
                            body={(rowData) =>
                                rowData.image.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt="Image"
                                        className="w-20 object-cover rounded"
                                    />
                                ))
                            }
                        />

                        <Column
                            header="Action"
                            body={(rowData) => (
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <Button
                                        onClick={() =>
                                            confirmAction(
                                                rowData.id,
                                                handleReject
                                            )
                                        }
                                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        icon="pi pi-eye"
                                        severity="success"
                                        onClick={() => {
                                            setSelectedSeeing(rowData);
                                            setVisible(true);
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    ></Button>
                                    <Button
                                        onClick={() =>
                                            confirmAction(
                                                rowData.id,
                                                handleAccept
                                            )
                                        }
                                        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        icon="pi pi-pencil"
                                        onClick={() =>
                                            router.get(
                                                `/sightSeeingDashboard/${rowData.id}`
                                            )
                                        }
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    ></Button>
                                </div>
                            )}
                        />
                    </DataTable>
                    {selectedSightSeeing && (
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
                                    <div>
                                        <h2>SightSeeing:</h2>
                                        <img
                                            src={selectedSightSeeing.image}
                                            width={400}
                                            height={50}
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
                            </div>
                        </Dialog>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default SightSeeingRequest;
