import React from "react";

export function PageHeader({title}: {title: string}) {
    return (
        <h1 className="header">
            {title}
        </h1>
    )
}