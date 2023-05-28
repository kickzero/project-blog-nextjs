
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
  Comments: any,
  CommentsChild: any
}

export default function PostDetail({PostDetails, PostRelateds, Comments, CommentsChild}: PostDataProps) {

  const [, setCommentsChild] = useGlobalState("commentschild");
  const [, setPostIdDetai] = useGlobalState("postIdDetail");

  useMemo(() => {
    setCommentsChild(CommentsChild);
    setPostIdDetai(PostDetails.id)
  }, [CommentsChild]);

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
              <PostDetailContent CommentsChild={CommentsChild} Comments={Comments} PostDetails={PostDetails}/>
          
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

  const postID = dataPostDetails.id;
  const currentPage = 1;

  // CommentsParent
  const responseCommentsParent = await commentService.getList({ page: currentPage, per_page: 5, post: postID, parent: 0, exclude: [] });
  const commentsParent = responseCommentsParent.data;
  const total = parseInt(responseCommentsParent.headers['x-wp-total']);
  const totalPages = parseInt(responseCommentsParent.headers['x-wp-totalpages']);

  // CommentsChild
  const commentsParentIdAuthorID = commentsParent.map((commentsParent: any)=>{ return (commentsParent.author)})
  // const commentsParentIdAuthorID = commentsParentIdAuthorID;
  // console.log("commentsParentIdAuthorID", commentsParentIdAuthorID)
  const responseCommentsChild = await commentService.getList({ page: currentPage, per_page: 3, post: postID, parent: commentsParentIdAuthorID });
  const commentsChild = responseCommentsChild.data;
  const totalChild = parseInt(responseCommentsChild.headers['x-wp-total']);
  const totalPagesChild = parseInt(responseCommentsChild.headers['x-wp-totalpages']);

  const postDetailCommentParentData = {
    ...commentsParent,
    CommentsData: commentsParent || [],
    total,
    totalPages, 
    currentPage,
  }

  const postDetailCommentChildData = {
    ...commentsChild,
    CommentsData: commentsChild,
    total,
    totalChild, 
    totalPagesChild,
    currentPage
  }

  return {
    props: {
      PostDetails: dataPostDetails || [],
      PostRelateds: datapostRelated || [],
      Comments: postDetailCommentParentData || [],
      CommentsChild: postDetailCommentChildData || []
    },
  }
}