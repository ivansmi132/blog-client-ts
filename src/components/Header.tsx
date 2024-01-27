import React from "react";

export function Header({title}: {title: string}) {
    return (
        <h1 className="header">
            {title}
        </h1>
    )
}