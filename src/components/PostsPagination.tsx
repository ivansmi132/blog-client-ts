import {Pagination} from "antd";
import {usePaginationContext} from "../hooks/usePaginationContext";

export function PostsPagination({currentNumberOfPosts, setLoading}: {currentNumberOfPosts: number, setLoading: CallableFunction}) {
    const {postsPagination, setPostsPagination} = usePaginationContext();
    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: "2%"}}>
            <Pagination current={postsPagination.currentPage}
                        total={currentNumberOfPosts}
                        pageSize={postsPagination.pageSize}
                        hideOnSinglePage
                        showSizeChanger={false}
                        onChange={(page, pageSize) => {
                            setPostsPagination((prev) => {
                                return {
                                    ...prev,
                                    currentPage: postsPagination.pageSize !== pageSize ? 1 : page,
                                    pageSize: pageSize
                                }
                            });
                            setLoading(true);
                            window.scrollTo(0, 0);
                        }}/>
        </div>
    )
}