import React from "react";

export function PostDate({date, className}: {date: string, className: string}) {
    const parseDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-GB', {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }
    return <div className={className}>{parseDate(date)}</div>
}