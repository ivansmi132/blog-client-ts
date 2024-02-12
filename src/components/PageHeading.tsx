import React from "react";

export function PageHeading({heading}: {heading: string}) {

    return (
        <h1 className="header">
            {heading}
        </h1>
    )
}