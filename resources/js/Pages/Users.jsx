import React from "react";

// here to show the regiered users from db
const Users = ({ users }) => {
    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default Users;
