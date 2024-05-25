import React, { useEffect, useState } from "react";
import Layout from "@/Layouts/layout/layout.jsx";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";

const Cars = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    father_name: "",
    tazkira_no: "",
    passport: "",
    image: "",
    location: "",
    entity_type: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  return (
    <Layout>
      <div className="container relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white-50 uppercase bg-black-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Father Name
              </th>
              <th scope="col" className="px-6 py-3">
                Tazkira No
              </th>
              <th scope="col" className="px-6 py-3">
                Passport
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Entity Type
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {data.name}
              </th>
              <td className="px-6 py-4">{data.email}</td>
              <td className="px-6 py-4">{data.father_name}</td>
              <td className="px-6 py-4">{data.tazkira_no}</td>
              <td className="px-6 py-4">{data.passport}</td>
              <td className="px-6 py-4">{data.image}</td>
              <td className="px-6 py-4">{data.location}</td>
              <td className="px-6 py-4">{data.entity_type}</td>
              <td className="px-6 py-4">
                <DangerButton label="Edit" className="w-full" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Cars;
