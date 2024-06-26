import { usePage } from "@inertiajs/react";
import React from "react";

const Check = () => {
    const { id } = usePage().props;
    console.log(id);
    return <div>{id}</div>;
};

export default Check;
