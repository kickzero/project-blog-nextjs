import commentService from "@/services/comment";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { useGlobalState } from "@/state";
import { useMemo, useState } from "react";
import styles from "./comments.module.css";

export default function PostDetailComments({PostDetails}: any) {
  const [postIdDetail] = useGlobalState("postIdDetail");
  const [commentLoading, setCommentLoading] = useState(false);
  const [{ comments, currentPage, exclude, totalComment }, setCommentsPaging] = useGlobalState("commentsPaging");

  const remainComment = totalComment - comments.length;

  const handleViewMoreComment = (page?: number) => {
    const p = page || currentPage + 1;
    if (!commentLoading) {
      setCommentLoading(true);
      commentService.getList({ postId, exclude, page: p }).then((res) => {
        const resComments: CommentType[] = res.data.map((e: any) => formatComment(e));
        const newComments = p === 1 ? resComments : [...comments, ...resComments];
        setCommentsPaging({ exclude, totalComment: res.headers["x-wp-total"] * 1, currentPage: p, totalPage: res.headers["x-wp-totalpages"] * 1, comments: newComments });
        setCommentLoading(false);
      });
    }
  };

  return (
    <div className={styles["post-detail__comments"]}>
          <CommentForm parentId={0}/>
          <p>{Comments.total} Comments</p>
            
          {Comments.CommentsData && Comments.CommentsData.length > 0 && (
            <ul className={styles["comments"]}>
              {Comments.CommentsData.map((comment: any) => (
                <CommentItem key={comment.id} comment={comment}/>
              ))}
            </ul>
          )}
          
          {restTotal > 0 && (
            <div className={styles["comments__hidden"] + " " + styles["parent"]}>
              <a href="/" onClick={handleLoadMore}>
                <i className={styles["icons"] + " ion-ios-undo"} /> Xem thêm {restTotal} câu trả lời
              </a>
            </div>
          )}
       
        </div>
  );
}