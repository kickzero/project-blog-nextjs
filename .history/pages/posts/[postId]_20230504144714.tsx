
import styles from "../../components/PostDetail/post-detail.module.css";
import PostDetailContent from "@/components/PostDetail/PostDetailContent";
import PostDetailHead from "@/components/PostDetail/PostDetailHead";
import PostDetailSidebar from "@/components/PostDetail/PostDetailSidebar";
import commentService from "@/services/comment";
import postService from "@/services/post";
import { useGlobalState } from "@/state";
import { GetServerSideProps, NextPageContext } from "next";
import { useMemo } from "react";


export type PostType = {
  id: any;
}

type PostDataProps = {
  PostDetails: any,
  PostRelateds: any,
}

export default function PostDetail({PostDetails, PostRelateds}: PostDataProps) {

  const [, setPostIdDetail] = useGlobalState("postIdDetail");

  useMemo(() => {
    setPostIdDetail(PostDetails.id)
  }, []);

  return (
    <>
      <main className={styles["post-detail"]}>
        <div className="spacing" />
        {/* Post Detail Head */}
        <PostDetailHead PostDetails={PostDetails}/>
        {/* End Post Detail Head */}
        <div className="spacing" />
        {/* Post Detail Wrapper Content */}
        <div className={styles["post-detail__fluid"]}>
          <div className="tcl-container">
            <div className={styles["post-detail__wrapper"]}>
              {/* Post Detail Content */}
              <PostDetailContent PostDetails={PostDetails}/>
          
              {/* Post Detail Sidebar */}
              <PostDetailSidebar PostDetails={PostDetails} PostRelateds={PostRelateds}/>
              {/* End Post Detail Sidebar */}
            </div>
          </div>
        </div>
        {/* End Post Detail Wrapper Content */}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PostDataProps> = async (context) => {

  // const ctx = context as NextPageContext;
  // PostDetails
  const { postId } = context.query;
  const response = await postService.getArticleDetail(postId);
  const dataPostDetails = response.data[0];
  
  // PostRelated 
  const responseRelated = await postService.getArticleRelated(dataPostDetails?.author, dataPostDetails?.id);
  const datapostRelated = responseRelated.data;

  return {
    props: {
      PostDetails: dataPostDetails || [],
      PostRelateds: datapostRelated || [],
    },
  }
}