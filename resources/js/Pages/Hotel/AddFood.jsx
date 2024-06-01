import Layout from "@/Layouts/layout/layout";
import { useForm } from "@inertiajs/react";
import { data } from "autoprefixer";
import React, { useState } from "react";
import { useEffect } from "react";
const AddFood = (props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        hotel_id: "",
        description: "",
        category_id: "",
        cost:"",
        image:"",
    });
    function handleSubmit(e) {
        e.preventDefault();
        post(route("hotel.store"));
    }
    const [photoAddress, setphotoAddress] = useState(null);

    useEffect(() => {
        return () => {
            reset("photoAddress", "password_confirmation");
        };
    }, []);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setData("photoAddress", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setphotoAddress(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return <div></div>;
};

export default AddFood;
