import Layout from "@/Layouts/layout/layout";
import React, { useState } from "react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const HotelRequest = () => {
    const { data } = usePage().props;

    const handleReject = (id) => {
        router.delete(`/hotelRequest/${id}`);
    };
    const handleAccept = (id) => {
        router.post(`/hotelRequest/${id}`);
    };
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("");

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
                                    router.get(`/addHotel`);
                                }}
                                className="px-2 py-2 rounded m-3"
                            >
                                <span className="mx-2">Hotel</span>
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
                </div>
                <div className="relative overflow-x-auto shadow-x sm:rounded-lg bg-white mt-5">
                    <DataTable value={data} className="w-full">
                        <Column field="id" header="ID" />
                        <Column field="name" header="Name" />
                        <Column field="address" header="Address" />
                        <Column field="province" header="Province" />
                        <Column
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
                            header="Accept"
                            body={(rowData) => (
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <Button
                                        onClick={() => handleAccept(rowData.id)}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:none"
                                    >
                                        Accept
                                    </Button>

                                    <Button
                                        onClick={() => handleReject(rowData.id)}
                                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:none"
                                    >
                                        Reject
                                    </Button>
                                </div>
                            )}
                        />
                    </DataTable>
                </div>
            </div>
        </Layout>
    );
};

export default HotelRequest;
