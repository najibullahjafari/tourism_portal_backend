import { Link, router, usePage } from "@inertiajs/react";
import React from "react";

const Message = (props) => {
    const { users } = usePage().props;
    console.log(users);
    return (
        <div className="container mx-auto my-8">
            <div className="space-y-8">
                {/* {users.map((item) => ( */}
                <div
                    // key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                    <Link
                        onClick={() => {
                            router.get(`/message/${users.id}`);
                        }}
                    >
                        {users.name}
                    </Link>
                </div>
                {/* ))} */}
            </div>
        </div>
    );
};

export default Message;
