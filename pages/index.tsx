import {ArticleGeneral} from "@/components/ArticleGeneral";
import { ArticleLatest } from "@/components/ArticleLatest";
import { ArticlePopular } from "@/components/ArticlePopular";
import { PostType } from "@/helper/formatApi";
import postService from "@/services/post";
import { GetServerSideProps } from "next";

// export type PostType = {
//   id: string,
//   title: any,
//   featured_media_url: any,
//   date: any,
//   author: any,
//   author_data: any,
//   authorAvatar: any | null,
//   excerpt: any,
//   categories: any,
//   slug: string,
//   view_count: string | null,
//   comment_count: string | null,
//   content: string,
// }

type HomeDataProps = {
  listPostsALatest: PostType[];
  listPostsAPopular: PostType[];
  listArticleGeneral: PostType[];
}

export default function Home({listPostsALatest, listPostsAPopular, listArticleGeneral}: HomeDataProps) {

  return (
    <>
      <ArticleLatest listPosts={listPostsALatest}/>
      <ArticlePopular listPosts={listPostsAPopular}/>
      <ArticleGeneral listPosts={listArticleGeneral}/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeDataProps> = async () => {
  // const ctx = context as NextPageContext;

  const listPostArticlesLatest =  postService.getArticlesLatest();
  // const dataPostArticlesLatest = listPostArticlesLatest.data;

  const listArticlePopular =  postService.getArticlesPopular();
  // const dataPostArticlePopular = listArticlePopular.data;

  const listArticleGeneral =  postService.getArticlesPaging({ page: 1, extraParam: { per_page: 2 } });
  // const dataPostArticleGeneral = listArticleGeneral.data;
  const [listPostsLatest, listPostsAPopular, listPostsGeneral] = await Promise.all([listPostArticlesLatest, listArticlePopular, listArticleGeneral].map((p) => p.catch((e) => e)));
  return {
    props: {
      listPostsALatest: listPostsLatest.data || [],
      listPostsAPopular: listPostsAPopular.data || [],  
      listArticleGeneral: listPostsGeneral.data || [], 
    },
  }
}

