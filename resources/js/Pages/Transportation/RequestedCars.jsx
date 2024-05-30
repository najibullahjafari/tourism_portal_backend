import Layout from "@/Layouts/layout/layout";
import React, { useState, useRef } from "react";
import { usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { router } from "@inertiajs/react";
import styled from "styled-components";

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

    const Tdstyled = styled.td`
        display: flex;
        flex-direction: column;
        gap: 5px;
        max-width: 200px;
    `;

    if (!data) {
        return <div className="fa fa-user">Loading...</div>;
    }

    return (
        <Layout>
            <div className="card p-2 border-round w-full ">
                <Toast ref={toast} />
                <ConfirmDialog />
                <div className="flex justify-content-between items-center m-3">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        The Requested Transportation services (Cars)
                    </h1>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto">
                    <thead className="text-xs text-white uppercase bg-gray-800 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                View
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900"
                                key={item.id}
                            >
                                <td className="px-6 py-4">{item.id}</td>
                                <td className="px-6 py-4 font-medium">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4">
                                    <img
                                        src={item.image}
                                        alt="Image"
                                        height={100}
                                        width={100}
                                        className=" border  object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <Button
                                        icon="pi pi-eye"
                                        severity="success"
                                        onClick={() => {
                                            setSelectedCar(item);
                                            setVisible(true);
                                        }}
                                        className="px-2 py-1 rounded"
                                    ></Button>
                                </td>
                                <Tdstyled className="px-6 py-4 ">
                                    <Button
                                        label="Accept"
                                        icon="pi pi-check"
                                        className="p-button-success"
                                        onClick={() =>
                                            confirmAction(item.id, acceptCar)
                                        }
                                    />
                                    <Button
                                        label="Reject"
                                        icon="pi pi-times"
                                        className="p-button-danger"
                                        onClick={() =>
                                            confirmAction(item.id, rejectCar)
                                        }
                                    />
                                </Tdstyled>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedCar && (
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
                                <h2>Name: {selectedCar.name}</h2>
                                <p>Father Name: {selectedCar.father_name}</p>
                                <p>Email: {selectedCar.email}</p>
                                <p>Phone: {selectedCar.phone}</p>
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
                                    label="Accept"
                                    icon="pi pi-check"
                                    className="p-button-success"
                                    onClick={() =>
                                        confirmAction(selectedCar.id, acceptCar)
                                    }
                                />
                                <Button
                                    label="Reject"
                                    icon="pi pi-times"
                                    className="p-button-danger"
                                    onClick={() =>
                                        confirmAction(selectedCar.id, rejectCar)
                                    }
                                />
                            </div>
                        </div>
                    </Dialog>
                )}
            </div>
        </Layout>
    );
};

export default requestedCars;
