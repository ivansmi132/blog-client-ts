import { Pagination } from "antd";
import {usePaginationContext} from "../hooks/usePaginationContext";

interface PostsPaginationProps {
    currentNumberOfPosts: number,
    setLoading: CallableFunction
}
export function PostsPagination({currentNumberOfPosts, setLoading}: PostsPaginationProps) {

    const {postsPagination, setPostsPagination} = usePaginationContext();

    function onPageChange(page: number, pageSize: number) {

        // on pageSize change we move to the first page
        // antd Pagination component supports pageSize, it's currently disabled
        setPostsPagination((prev) => (
            {
                ...prev,
                currentPage: postsPagination.pageSize !== pageSize ? 1 : page,
                pageSize: pageSize
            }));

        setLoading(true);
        window.scrollTo(0, 0);
    }


    return (
        <div className="pagination-container">
            <Pagination current={postsPagination.currentPage}
                        total={currentNumberOfPosts}
                        pageSize={postsPagination.pageSize}
                        hideOnSinglePage
                        showSizeChanger={false}
                        onChange={onPageChange}/>
        </div>
    )
}