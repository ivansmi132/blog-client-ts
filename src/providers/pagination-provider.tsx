import {createContext, Dispatch, SetStateAction, useState} from "react";
import {ContextProviderProps} from "../models/ContextProviderProps";

interface Pagination {
    currentPage: number,
    pageSize: number,
    query: string,
    type: string
}

interface PaginationContextValue {
    postsPagination: Pagination,
    setPostsPagination: Dispatch<SetStateAction<Pagination>>,
    resetToPage1: CallableFunction
}

export const PaginationContext =
    createContext<PaginationContextValue | null>(null);

export function PaginationContextProvider({children}: ContextProviderProps) {
    const [postsPagination, setPostsPagination] = useState<Pagination>({
        currentPage: 1,
        pageSize: 5,
        query: "",
        type: "title"
    })

    function resetToPage1() {
        setPostsPagination((prev) => {
            return {
                ...prev,
                currentPage: 1
            }
        });
    }

    const value: PaginationContextValue = {
        postsPagination,
        setPostsPagination,
        resetToPage1}

    return (
        <PaginationContext.Provider value={value}>
            {children}
        </PaginationContext.Provider>
    )
}