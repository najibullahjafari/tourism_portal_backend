import React from "react";
import Layout from "@/Layouts/layout/layout.jsx";

const Cars = ({ cars }) => {
    return (
        <Layout>
            <div>
                <h1>Cars</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                            <tr key={car.id}>
                                <td>{car.brand}</td>
                                <td>{car.model}</td>
                                <td>{car.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};
export default Cars;
