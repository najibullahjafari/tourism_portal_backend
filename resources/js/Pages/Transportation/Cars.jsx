import React from "react";
import Layout from "@/Layouts/layout/layout.jsx";
import ProductOne from "@/assets/images/layout/themes/fluent-light.png";

const car = [
    {
        image: ProductOne,
        name: "Apple Watch Series 7",
        category: "Electronics",
        price: 296,
        sold: 22,
        profit: 45,
    },
    {
        image: ProductOne,
        name: "Macbook Pro M1",
        category: "Electronics",
        price: 546,
        sold: 12,
        profit: 125,
    },
    {
        image: ProductOne,
        name: "Dell Inspiron 15",
        category: "Electronics",
        price: 443,
        sold: 64,
        profit: 247,
    },
    {
        image: ProductOne,
        name: "HP Probook 450",
        category: "Electronics",
        price: 499,
        sold: 72,
        profit: 103,
    },
];

const Cars = () => {
    return (
        <Layout>
            <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
                <div className="py-6 px-4 md:px-6 xl:px-8">
                    <h4 className="text-2xl font-semibold text-black dark:text-white">
                        Top Products
                    </h4>
                </div>

                <div className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-8">
                    <div className="col-span-3 mx-2 flex items-center">
                        <p className="font-medium text-lg">Product Name</p>
                    </div>
                    <div className="col-span-2 hidden items-center sm:flex">
                        <p className="font-medium text-lg">Category</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium text-lg">Price</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium text-lg">Sold</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium text-lg">Profit</p>
                    </div>
                </div>

                {car.map((car, key) => (
                    <div
                        className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-8 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
                        key={key}
                    >
                        <div className="col-span-3 flex items-center">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="h-16 w-20 rounded-md overflow-hidden">
                                    <img
                                        src={car.image}
                                        alt="Product"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <p className="text-sm text-black dark:text-white">
                                    {car.name}
                                </p>
                            </div>
                        </div>
                        <div className="col-span-2 hidden items-center sm:flex">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                {car.category}
                            </p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-sm text-black dark:text-white">
                                ${car.price}
                            </p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-sm text-black dark:text-white">
                                {car.sold}
                            </p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-sm text-green-600 dark:text-green-400">
                                ${car.profit}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Cars;
