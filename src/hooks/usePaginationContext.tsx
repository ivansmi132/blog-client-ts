import {useContext} from "react";
import {PaginationContext} from "../providers/pagination-provider";

export function usePaginationContext() {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error("usePaginationContext must be used within PaginationContextProvider");
    }
    return context
}