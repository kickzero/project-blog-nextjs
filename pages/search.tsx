import { useRouter } from "next/router";
import { useEffect } from "react";
import { NextPageContext, NextPage } from "next";

import postService from "@/services/post";
import { MainTitle } from "@/components/shared/MainTitle";
import { ArticleItem } from "@/components/ArticleItem";
import usePostPaging from "@/hooks/usePostPaging";
import { Button } from "@/components/shared/Button";
import { PostType } from "@/helper/formatApi";

type PropsType = {
    listPosts: PostType[],
    searchValue: string,
    totalPost: number,
}

const SearchPage = ({ listPosts, searchValue, totalPost }: PropsType) => {
    const router = useRouter();
    const searchStr = (router.query.q || '') as string;

    const { posts, isLastPage, loadMore, loading } = usePostPaging({ initialPost: listPosts, extraParam: { per_page: 2, search: searchValue }, triggerChange: searchValue });

    useEffect(() => {
        if(!searchStr) {
            router.push('/');
        }
    }, [searchStr])

    // console.log("menus", menus);

    return (
      <div className="articles-list section">
      <div className="tcl-container">
        <MainTitle type="search">
          {totalPost} kết quả tìm kiếm với từ khóa "{searchStr}"
        </MainTitle>
        <div className="tcl-row tcl-jc-center">
          {posts.map((datapost: any) => (
            <div className="tcl-col-12 tcl-col-md-8" key={datapost.id}>
              <ArticleItem isStyleCard isShowCategoies isShowAvatar={false} isShowDesc={false} post={datapost} />
            </div>
          ))}
        </div>
        <div className="text-center">
          {!isLastPage && (
            <Button theme="primary" size="large" loading={loading} onClick={loadMore} className="mt-4">
              Tải thêm
            </Button>
          )}
        </div>
      </div>
    </div>
    )
}

SearchPage.getInitialProps = async (ctx: NextPageContext) => {
  
    const query = ctx.query.q || '';
    const params = { extrasParam: { per_page: 1, search: query } };
    const listPostsRes = await postService.getArticlesPaging({ page: 1, extraParam: params.extrasParam });
    const totalPost = listPostsRes.headers["x-wp-total"];
    console.log("params", params);
    return {
      listPosts: listPostsRes.data || [],
      searchValue: query,
      totalPost: totalPost,
    }
}

// export async function actFetchArticlePagingAsync(page = 1, extrasParam = {}){
//   const response = await postService.getArticlesPaging(page, extrasParam);
//   const data = response.data;
//   const total = response.headers['x-wp-total'];
//   const totalPages = response.headers['x-wp-totalpages']; 
//   return { response, data, total, totalPages };
// }

export default SearchPage