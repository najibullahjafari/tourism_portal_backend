import { router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import React from "react";

const MessageDetial = () => {
    const { messages, id } = usePage().props;
    console.log(messages, "what");
    return (
        <div className="flex justify-center items-center">
            <div className=" h-screen overflow-x-auto shadow-x sm:rounded-lg bg-white w-1/2">
                {" "}
                <h3 className="max-w-md mx-auto mt-5">Message To Hotels</h3>
                {/* {messages.map((message) => (
                    <div key={message.id} className="mx-2 my-4">
                        <h4>{message.writer_name} siad:</h4>
                        <p>{message.message}</p>
                    </div>

                ))} */}
                {messages.map((message) => (
                    <div key={message[0].id}>
                        <h4>{message[0].writer_name} siad:</h4>
                        <p>{message[0].message}</p>
                    </div>
                ))}
                <form className="flex justify-center items-center">
                    <input
                        type="text"
                        placeholder="Type message"
                        name="message"
                        className="mx-2
                        "
                    />
                    <input type="hidden" name="type" value="hotel" />
                    <Button icon="pi pi-send" className="mx-2"></Button>
                </form>
            </div>
        </div>
    );
};

export default MessageDetial;
