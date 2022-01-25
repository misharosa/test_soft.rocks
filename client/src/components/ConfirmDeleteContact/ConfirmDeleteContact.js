import React from "react";

export const ConfirmDeleteContact = ({ details }) => {
    return (
        <div>
            <h1>Details</h1>
            <div>{details.name}</div>
            <div>{details.username}</div>
            <div>{details.phone}</div>
            <div>{details.email}</div>
        </div>
    )
}