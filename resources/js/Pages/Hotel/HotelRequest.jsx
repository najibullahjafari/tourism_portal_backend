import Layout from "@/Layouts/layout/layout";
import React from "react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
const HotelRequest = () => {
    const { data } = usePage().props;
    const { delete: destroy } = useForm();
    const handleReject = (id) => {
        router.delete(`/hotelRequest/${id}`);
    };
    const handleAccept = (id) => {
        router.post(`/hotelRequest/${id}`);
    };
    return (
        <Layout>
            <div class="relative overflow-x-auto shadow-x sm:rounded-lg bg-white">
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
                                Status
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
                                <td class="px-6 py-4">{item.status}</td>
                                <td class="px-6 py-4">
                                    <Button
                                        // href="hotelRequest/view"
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
