import Layout from "@/Layouts/layout/layout";
import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { router } from "@inertiajs/react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";

const Cars = () => {
    const { data } = usePage().props;

    const deleteCar = (id) => {
        router.delete(`/car/requests/${id}`);
    };

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [visible, setVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        father_name: "",
        email: "",
        phone: "",
        location: "",
        image: null,
        passport: null,
    });

    const imageBodyTemplate = (rowData) => (
        <img
            src={rowData.image}
            alt="Car"
            width={50}
            height={50}
            className="object-cover rounded"
        />
    );

    const passportBodyTemplate = (rowData) => (
        <img
            src={rowData.passport}
            alt="Passport"
            width={50}
            height={50}
            className="object-cover rounded"
        />
    );

    const actionButtonTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button
                icon="pi pi-eye"
                className="p-button-rounded p-button-info p-button-icon-only"
                onClick={() => {
                    setSelectedCar(rowData);
                    setEditMode(false);
                    setVisible(true);
                }}
            />
            <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-warning p-button-icon-only"
                onClick={() => {
                    setFormData({
                        name: rowData.name,
                        father_name: rowData.father_name,
                        email: rowData.email,
                        phone: rowData.phone,
                        location: rowData.location,
                        image: rowData.image,
                        passport: rowData.passport,
                    });
                    setSelectedCar(rowData);
                    setEditMode(true);
                    setVisible(true);
                }}
            />
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger p-button-icon-only"
                onClick={() => deleteCar(rowData.id)}
            />
        </div>
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditSubmit = () => {
        const updatedFormData = new FormData();
        for (const key in formData) {
            updatedFormData.append(key, formData[key]);
        }
        router.put(`/car/requests/${selectedCar.id}`, updatedFormData, {
            onSuccess: () => setVisible(false),
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    const handleImageUpload = (event) => {
        const file = event.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    image: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePassportUpload = (event) => {
        const file = event.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    passport: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    if (!data) {
        return <div className="fa fa-user">Loading...</div>;
    }

    return (
        <Layout>
            <div className="card p-2 border-round w-full">
                <div className="flex justify-content-between items-start m-3">
                    <h2>Cars</h2>
                    <FloatLabel>
                        <InputText
                            type="text"
                            id="search"
                            onChange={(event) =>
                                setGlobalFilter(event.target.value)
                            }
                            className="w-full rounded-md h-12 mr-3"
                        />
                        <label htmlFor="search">Search</label>
                    </FloatLabel>
                    <Link href={route("cars.requests")} className="btn">
                        <Button severity="primary" label="Add Car" />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <DataTable
                        value={data}
                        paginator
                        rows={rows}
                        first={first}
                        onPage={onPageChange}
                        globalFilter={globalFilter}
                        emptyMessage="No cars found."
                        className="p-datatable-gridlines"
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        tableStyle={{ minWidth: "50rem" }}
                    >
                        <Column field="id" header="ID" sortable />
                        <Column field="name" header="Name" sortable />
                        <Column
                            body={passportBodyTemplate}
                            header="Licence Scan"
                        />
                        <Column body={imageBodyTemplate} header="Car Image" />
                        <Column field="phone" header="Driver Phone" sortable />
                        <Column field="location" header="Location" />
                        <Column body={actionButtonTemplate} header="Action" />
                    </DataTable>
                </div>

                {selectedCar && (
                    <Dialog
                        visible={visible}
                        modal
                        onHide={() => setVisible(false)}
                    >
                        <div
                            style={{
                                borderRadius: "12px",
                                backgroundColor: "var(--secondary-400)",
                            }}
                        >
                            <div className="flex flex-column px-8 py-5 gap-4">
                                {editMode ? (
                                    <>
                                        <h2>Edit Car</h2>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                                <FloatLabel>
                                                    <InputText
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full"
                                                    />
                                                    <label htmlFor="name">
                                                        Name
                                                    </label>
                                                </FloatLabel>
                                            </div>
                                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                                <FloatLabel>
                                                    <InputText
                                                        id="father_name"
                                                        name="father_name"
                                                        value={
                                                            formData.father_name
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full"
                                                    />
                                                    <label htmlFor="father_name">
                                                        Father Name
                                                    </label>
                                                </FloatLabel>
                                            </div>
                                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                                <FloatLabel>
                                                    <InputText
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full"
                                                    />
                                                    <label htmlFor="email">
                                                        Email
                                                    </label>
                                                </FloatLabel>
                                            </div>
                                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                                <FloatLabel>
                                                    <InputText
                                                        id="phone"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full"
                                                    />
                                                    <label htmlFor="phone">
                                                        Phone
                                                    </label>
                                                </FloatLabel>
                                            </div>
                                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                                <FloatLabel>
                                                    <InputText
                                                        id="location"
                                                        name="location"
                                                        value={
                                                            formData.location
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full"
                                                    />
                                                    <label htmlFor="`location">
                                                        Location
                                                    </label>
                                                </FloatLabel>
                                            </div>
                                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                                <FileUpload
                                                    name="image"
                                                    accept="image/*"
                                                    mode="basic"
                                                    auto
                                                    onSelect={handleImageUpload}
                                                    label="Car Image"
                                                    chooseOptions={{
                                                        label: "Choose Image",
                                                    }}
                                                />
                                                {formData.image ? (
                                                    <img
                                                        src={formData.image}
                                                        alt="Car"
                                                        className="mt-2"
                                                        width={100}
                                                    />
                                                ) : (
                                                    <img
                                                        src={selectedCar.image}
                                                        alt="Previous Car"
                                                        className="mt-2"
                                                        width={100}
                                                    />
                                                )}
                                            </div>
                                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                                <FileUpload
                                                    name="passport"
                                                    accept="image/*"
                                                    mode="basic"
                                                    auto
                                                    onSelect={
                                                        handlePassportUpload
                                                    }
                                                    label="Licence Scan"
                                                    chooseOptions={{
                                                        label: "Choose Passport",
                                                    }}
                                                />
                                                {formData.passport ? (
                                                    <img
                                                        src={formData.passport}
                                                        alt="Passport"
                                                        className="mt-2"
                                                        width={100}
                                                    />
                                                ) : (
                                                    <img
                                                        src={
                                                            selectedCar.passport
                                                        }
                                                        alt="Previous Passport"
                                                        className="mt-2"
                                                        width={100}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                            <Button
                                                label="Save"
                                                icon="pi pi-check"
                                                className="p-button-success"
                                                onClick={handleEditSubmit}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2>Name: {selectedCar.name}</h2>
                                        <p>
                                            Father Name:{" "}
                                            {selectedCar.father_name}
                                        </p>
                                        <p>Email: {selectedCar.email}</p>
                                        <p>Phone: {selectedCar.phone}</p>
                                        <p>Address: {selectedCar.location}</p>
                                        <div>
                                            <p>Car:</p>
                                            <img
                                                src={selectedCar.image}
                                                width={400}
                                                height={50}
                                                alt="Car"
                                                className="rounded border p-2"
                                            />
                                        </div>
                                        <div>
                                            <p>Passport:</p>
                                            <img
                                                width={400}
                                                height={50}
                                                src={selectedCar.passport}
                                                alt="Passport"
                                                className="rounded border p-2"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </Dialog>
                )}
            </div>
        </Layout>
    );
};

export default Cars;
