import { Pagination } from "antd";
import {usePaginationContext} from "../hooks/usePaginationContext";

interface PostsPaginationProps {
    currentNumberOfPosts: number,
    setLoading: CallableFunction
}
export function PostsPagination({currentNumberOfPosts, setLoading}: PostsPaginationProps) {

    const {postsPagination, setPostsPagination} = usePaginationContext();

    function onPageChange(page: number, pageSize: number) {

            setPostsPagination((prev) => (
                {
                    ...prev,
                    // antd Pagination component supports adjusting pageSize
                    // when pageSize changes, we move to cause a render to the component
                    // and move to the first page
                    currentPage: postsPagination.pageSize !== pageSize ? 1 : page,
                    pageSize: pageSize
                }));

            setLoading(true);

            window.scrollTo(0, 0);
        }


    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: "2%"}}>
            <Pagination current={postsPagination.currentPage}
                        total={currentNumberOfPosts}
                        pageSize={postsPagination.pageSize}
                        hideOnSinglePage
                        showSizeChanger={false}
                        onChange={onPageChange}/>
        </div>
    )
}