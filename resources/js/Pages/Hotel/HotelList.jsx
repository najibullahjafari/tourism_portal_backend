import Layout from "@/Layouts/layout/layout";
import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useRef } from "react";
// import { SpeedDial } from "primereact/speeddial";
// import { useRouter } from "next/router";
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
    return (
        <Layout>
            <div class="relative overflow-x-auto shadow-x sm:rounded-lg bg-white">
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
            <div class="relative overflow-x-auto shadow-x sm:rounded-lg bg-white mt-5">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-white-50 uppercase bg-black-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Province
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Visit
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action Hotel
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                key={item.id}
                            >
                                <td class="px-6 py-4">{item.id}</td>
                                <td class="px-6 py-4">{item.name}</td>
                                <td class="px-6 py-4">{item.address}</td>
                                <td class="px-6 py-4">{item.province}</td>
                                <td class="px-6 py-4">
                                    {" "}
                                    <img
                                        src={item.photoAddress}
                                        alt="Image"
                                        class="w-20 object-cover rounded"
                                    />
                                </td>
                                <td>
                                    <div class="px-10 py-1">
                                        <Button
                                            onClick={() =>
                                                router.post(
                                                    `/HotelDashboard/${item.id}`
                                                )
                                            }
                                            key={item.id}
                                            className="p-button-success"
                                        >
                                            Visit
                                        </Button>
                                    </div>
                                </td>
                                <td>
                                    <div class="px-10 py-1">
                                        <Button
                                            onClick={() =>
                                                confirmAction(
                                                    item.id,
                                                    handleDelete
                                                )
                                            }
                                            icon="pi pi-times"
                                            className="p-button-danger"
                                        ></Button>
                                    </div>
                                    <div class="px-10 py-1">
                                        <Button
                                            icon="pi pi-eye"
                                            severity="success"
                                            onClick={() => {
                                                setSelectedHotel(item);
                                                setVisible(true);
                                            }}
                                            className="px-2 py-1 rounded"
                                        ></Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

                                {/* <Button
                                    label="Accept"
                                    icon="pi pi-check"
                                    className="p-button-success"
                                    onClick={() =>
                                        confirmAction(
                                            selectedHotel.id,
                                            acceptCar
                                        )
                                    }
                                /> */}
                                {/* <Button
                                    label="Reject"
                                    icon="pi pi-times"
                                    className="p-button-danger"
                                    onClick={() =>
                                        confirmAction(selectedCar.id, rejectCar)
                                    }
                                /> */}
                            </div>
                        </div>
                    </Dialog>
                )}
            </div>
        </Layout>
    );
};

export default HotelList;
