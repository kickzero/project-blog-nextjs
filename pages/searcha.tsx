import { ArticleItem } from "@/components/ArticleItem";
import { Button } from "@/components/shared/Button";
import { MainTitle } from "@/components/shared/MainTitle";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import postService from "@/services/post";
import { NextPage, NextPageContext } from "next";
import { useGlobalState } from "@/state";
import { usePostPaging } from "@/hooks/usePostPaging";


export type PostType = {
  id: string;
}

type SearchDataProps = {
  listPosts: any
}
const SearchPage: NextPage<SearchDataProps> = ({listPosts}) => {
  const [posts, setPosts] = useState([]);
  const [ DataPost , setDataPost] = useGlobalState("dataPost");
  const [ total , setTotal] = useState("dataPost");
  const [ totalPages , setTotalPages] = useGlobalState("totalPages");
  const router = useRouter();
  const searchStr = (router.query.q || '') as string;
  const params = { extrasParam: { per_page: 1, search: searchStr } };
  const { showButtonLoadMore } = usePostPaging(params);
  let currentPage = 1;
  // const {response} = actFetchArticlePagingAsync(1, params.extrasParam);
  console.log("listPosts", listPosts);

  useEffect(() =>  {
      if(!searchStr) {
          router.push('/');
      }
      actFetchArticlePagingAsync(1, params.extrasParam).then(data => {return setDataPost(data.data), setTotal(data.total), setTotalPages(data.totalPages)});
  }, [searchStr])

  // const [listPostsRes ] = await Promise.all([listPostsPos]);
  // console.log("listPostsPos", listPostsPos);
  // console.log("searchStr", searchStr);
  return (
    <div className="articles-list section">
      <div className="tcl-container">
        <MainTitle type="search">
          {total} kết quả tìm kiếm với từ khóa "{searchStr}"
        </MainTitle>
        <div className="tcl-row tcl-jc-center">
          {DataPost.map((datapost: any) => (
            <div className="tcl-col-12 tcl-col-md-8" key={datapost.id}>
              <ArticleItem isStyleCard isShowCategoies isShowAvatar={false} isShowDesc={false} post={datapost} />
            </div>
          ))}
          {/* <div className="tcl-col-12 tcl-col-md-8">
            <ArticleItem isStyleCard isShowCategoies isShowAvatar={false} isShowDesc={false} />
          </div>
          <div className="tcl-col-12 tcl-col-md-8">
            <ArticleItem isStyleCard isShowCategoies isShowAvatar={false} isShowDesc={false} />
          </div>
          <div className="tcl-col-12 tcl-col-md-8">
            <ArticleItem isStyleCard isShowCategoies isShowAvatar={false} isShowDesc={false} />
          </div> */}
        </div>
        {showButtonLoadMore()}
        <div className="text-center">
          <Button  onClick={async () => {
                const response = await postService.getArticlesPaging(currentPage + 1, params.extrasParam);
                const data = response.data;
                setPosts(currentPage ? data : [...DataPost, ...data]);
          }}
          htmlType="submit" type="primary" size="large">
            Tải thêm
          </Button>
        </div>
      </div>
    </div>
  );
}

SearchPage.getInitialProps = async (ctx: NextPageContext) => {
  const query = ctx.query.q || '';
  const params = { extrasParam: { per_page: 1, search: query } };
  console.log("ctx", ctx);

  const listPostsRes = actFetchArticlePagingAsync(1, params.extrasParam);

  return {
      listPosts: listPostsRes || []
  }
}

export async function actFetchArticlePagingAsync(page = 1, extrasParam = {}){
  const response = await postService.getArticlesPaging(page, extrasParam);
  const data = response.data;
  const total = response.headers['x-wp-total'];
  const totalPages = response.headers['x-wp-totalpages']; 
  return { response, data, total, totalPages };
}

export default SearchPage;
