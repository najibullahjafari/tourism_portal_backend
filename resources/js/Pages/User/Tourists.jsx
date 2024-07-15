import Layout from "@/Layouts/layout/layout";
import { router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import React from "react";
const Tourists = () => {
    const { data } = usePage().props;
    return (
        <Layout>
            {data.map((item) => (
                <div
                    className="bg-gray-80 flex content-center justify-center "
                    key={item.id}
                >
                    <div className="bg-gray-50 py-12 w-1/2">
                        <div className="max-w-screen-lg mx-auto">
                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="px-6 pt-8">
                                    <div className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                        Information Of {item.name}
                                    </div>
                                </div>
                                <div className="px-6 py-2">{item.bio}</div>
                                <div className="px-6 py-2">
                                    <img
                                        src={item.image}
                                        alt="Hotel Image"
                                        style={{
                                            height: "45vh",
                                            width: "100%",
                                        }}
                                    ></img>
                                </div>
                                <div className="px-6 py-2">
                                    <Button
                                        className="mx-3 my-3 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        icon="pi pi-thumbs-up"
                                        onClick={() => {
                                            router.get(
                                                `/like/${item.id}?type=tourist&page=tourist`
                                            );
                                        }}
                                    >
                                        <span className="ml-2">
                                            {item.liked}
                                        </span>
                                    </Button>
                                    <button
                                        className="mx-3 my-3 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        // disable={roomStatus}
                                    >
                                        Comment
                                    </button>
                                    <button
                                        className="mx-3 my-3 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() =>
                                            router.get(
                                                `/touristDetial/${item.id}`
                                            )
                                        }
                                    >
                                        Detial
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Layout>
    );
};

export default Tourists;
