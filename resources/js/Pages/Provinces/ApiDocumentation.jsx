// src/ApiDocumentation.js
import React from "react";
import Navbar from "../Navbar";
import Vission from "../Vission";
import Footer from "../Footer";

const ApiDocumentation = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-8">
                    API Documentation
                </h1>

                <div className="card p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">
                        Get Provinces API
                    </h2>
                    <p className="mb-2">
                        <strong>Endpoint:</strong> <code>/getProvinceApi</code>
                    </p>
                    <p className="mb-2">
                        <strong>Method:</strong> GET
                    </p>
                    <p className="mb-4">
                        <strong>Description:</strong> Retrieves a list of
                        provinces with their respective districts.
                    </p>

                    <h3 className="text-xl font-bold mb-2">
                        Response Example:
                    </h3>
                    <pre className="card p-4 rounded-lg overflow-auto">
                        {`{
  "id": 1,
  "name": "Urozgan",
  "nameFa": "اورزگان",
  "namePa": "اورزگان",
  "latitude": "32.8037870",
  "longitude": "65.5443140",
  "districts": [
    {
      "id": 392,
      "name": "Chora",
      "nameFa": "چوره",
      "namePa": "چوره",
      "latitude": "33.022580",
      "longitude": "66.239689"
    },
    {
      "id": 393,
      "name": "Deh Rahwod",
      "nameFa": "دهراوود",
      "namePa": "دهراوود",
      "latitude": "32.635969",
      "longitude": "65.498235"
    },
    {
      "id": 394,
      "name": "Khas Uruzgan",
      "nameFa": "ارزگان خاص",
      "namePa": "ارزگان خاص",
      "latitude": "32.977052",
      "longitude": "66.729130"
    },
    {
      "id": 395,
      "name": "Shahidi Hassas",
      "nameFa": "شهید حساس",
      "namePa": "شهید حساس",
      "latitude": "32.932212",
      "longitude": "65.538666"
    },
    {
      "id": 396,
      "name": "Tarin Kowt",
      "nameFa": "ترینکوت",
      "namePa": "ترینکوت",
      "latitude": "32.654960",
      "longitude": "65.849924"
    }
  ],
  "created_at": "2024-07-26T15:24:21.000000Z",
  "updated_at": "2024-07-26T15:24:21.000000Z"
}`}
                    </pre>
                </div>
            </div>
            <Vission />
            <Footer />
        </>
    );
};

export default ApiDocumentation;
