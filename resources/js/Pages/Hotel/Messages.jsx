import Layout from "@/Layouts/layout/layout";
import { router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import React from "react";

const Messages = () => {
    const { hotels } = usePage().props;
    return (
        <Layout>
            <div className="relative overflow-x-auto shadow-x sm:rounded-lg bg-white">
                <h3 className="max-w-md mx-auto mt-5">Message To Hotels</h3>
                {hotels.map((hotel) => (
                    <div key={hotel.id} className="mx-2 my-4">
                        <Button
                            onClick={() =>
                                router.get(`messageDetail/${hotel.id}`)
                            }
                        >
                            Message To {hotel.name}
                        </Button>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Messages;
