import React from "react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout";

const ShowProvinces = () => {
    const { data } = usePage().props;
    const districtsLength = data.reduce(
        (total, province) => total + JSON.parse(province.districts).length,
        0
    );

    const [searchTerm, setSearchTerm] = React.useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter(
        (province) =>
            province.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            province.nameFa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            province.namePa.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="container card mx-auto p-4">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Provinces List
                </h1>
                <div className="flex flex-col gap-4 ">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="p-2  rounded-lg shadow-sm h-17 text-black"
                    />
                    {filteredData.map((province) => (
                        <div
                            key={province.id}
                            className="card p-4 border-primary rounded-lg shadow-lg"
                        >
                            <h2 className="text-xl font-bold">
                                {province.name}
                            </h2>
                            <p>
                                <strong>Name (Fa):</strong> {province.nameFa}
                            </p>
                            <p>
                                <strong>Name (Pa):</strong> {province.namePa}
                            </p>
                            <p>
                                <strong>Latitude:</strong> {province.latitude}
                            </p>
                            <p>
                                <strong>Longitude:</strong> {province.longitude}
                            </p>
                            <div className="border-primary card grid grid-cols-3 gap-2">
                                <strong className="row">
                                    Districts:{" "}
                                    {JSON.parse(province.districts).length}
                                </strong>
                                {JSON.parse(province.districts).map(
                                    (district) => (
                                        <div
                                            key={district.id}
                                            className="card rounded-bl-none  p-2 mt-2 border-primary rounded-lg shadow-lg"
                                        >
                                            <p>
                                                <strong>Name:</strong>{" "}
                                                {district.name}
                                            </p>
                                            <p>
                                                <strong>Name (Fa):</strong>{" "}
                                                {district.nameFa}
                                            </p>
                                            <p>
                                                <strong>Name (Pa):</strong>{" "}
                                                {district.namePa}
                                            </p>
                                            <p>
                                                <strong>Latitude:</strong>{" "}
                                                {district.latitude}
                                            </p>
                                            <p>
                                                <strong>Longitude:</strong>{" "}
                                                {district.longitude}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default ShowProvinces;
