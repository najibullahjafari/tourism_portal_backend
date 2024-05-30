import Layout from "@/Layouts/layout/layout";
import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { DataTable } from "primereact/datatable";
import DangerButton from "@/Components/DangerButton";
import { router } from "@inertiajs/react";

const cars = () => {
    const { data } = usePage().props;
    const deleteCar = (id) => {
        router.delete(`/car/requests/${id}`);
    };

    const [selectedCar, setSelectedCar] = useState(null);
    const [visible, setVisible] = useState(false);

    if (!data) {
        return <div className="fa fa-user">Loading...</div>;
    }
    return (
        <Layout>
            <div class="card p-2 border-round w-full ">
                {/* here the add button */}
                <div class=" flex justify-content-between items-center m-3">
                    <h1 class="text-xl font-bold text-gray-800 dark:text-gray-100">
                        The registered Cars
                    </h1>

                    <Link href={route("cars.requests")} className="btn">
                        <span name="fa fa-plus" className="mr-2" />
                        <Button severity="primary" label="Add Car">
                            {" "}
                        </Button>
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table class=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                        <thead class="text-xs text-white uppercase bg-gray-800 dark:bg-gray-700">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Licience scan
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Car Image
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Driver Phone
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Location
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr
                                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900"
                                    key={item.id}
                                >
                                    <td class="px-6 py-4">{item.id}</td>
                                    <td class="px-6 py-4 font-medium">
                                        {item.name}
                                    </td>
                                    <td class="px-6 py-4">
                                        <img
                                            src={item.passport}
                                            alt="Passport"
                                            width={50}
                                            height={50}
                                            class=" object-cover rounded"
                                        />
                                    </td>
                                    <td class="px-6 py-4">
                                        {console.log(item.image)}
                                        <img
                                            src={item.image}
                                            alt="Image"
                                            width={50}
                                            height={50}
                                            class=" object-cover rounded"
                                        />
                                    </td>
                                    <td class="px-6 py-4">{item.phone}</td>
                                    <td class="px-6 py-4">{item.location}</td>
                                    {/* <td class="px-6 py-4">
                                    <Link
                                        href={route("item.show", {
                                            id: item.id,
                                        })}
                                        as="a"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:none"
                                    >
                                        View
                                    </Link>
                                </td> */}
                                    <td class="px-6 py-4">
                                        <DangerButton
                                            onClick={() => deleteCar(item.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                        >
                                            delete
                                        </DangerButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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

export default cars;
