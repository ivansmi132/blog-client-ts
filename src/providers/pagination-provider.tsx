import {createContext, Dispatch, SetStateAction, useState} from "react";
import {ContextProviderProps} from "../models/ContextProviderProps";

interface Pagination {
    currentPage: number,
    pageSize: number,
    query: string
}

interface PaginationContextValue {
    postsPagination: Pagination,
    setPostsPagination: Dispatch<SetStateAction<Pagination>>
}

export const PaginationContext =
    createContext<PaginationContextValue | null>(null);

export function PaginationContextProvider({children}: ContextProviderProps) {
    const [postsPagination, setPostsPagination] = useState<Pagination>({
        currentPage: 1,
        pageSize: 10,
        query: ""
    })

    const value: PaginationContextValue = {postsPagination, setPostsPagination}

    return (
        <PaginationContext.Provider value={value}>
            {children}
        </PaginationContext.Provider>
    )
}