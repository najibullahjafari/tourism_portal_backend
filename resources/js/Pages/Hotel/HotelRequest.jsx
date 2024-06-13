import Layout from "@/Layouts/layout/layout";
import React from "react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import { useState } from "react";
const HotelRequest = () => {
    const { data } = usePage().props;
    console.log(data, "none");
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
            <div class="relative overflow-x-auto shadow-x sm:rounded-lg bg-white">
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
                                Accept
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Reject
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                key={item.id}
                            >
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {item.id}
                                </th>
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
                                <td class="px-6 py-4">
                                    <Button
                                        onClick={() => handleAccept(item.id)}
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:none"
                                    >
                                        Accept
                                    </Button>
                                </td>
                                <td class="px-6 py-4">
                                    <button
                                        onClick={() => handleReject(item.id)}
                                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:none"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default HotelRequest;
