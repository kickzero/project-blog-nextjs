import { useGlobalState } from "@/state";
import CommentForm from "./CommentForm";
import { useMemo, useState } from "react";
import styles from "./comments.module.css";

type Props = {
  authorInfo: {
    nickname: string;
    desc: string;
    avatar: string;
  };
  content: string;
  date: string;
  commentReplyCount: number;
  postId: number;
  commentId: number;
  isChildren?: boolean;
};

export default function CommentItem({ authorInfo, content, date, commentReplyCount, postId, commentId, isChildren }: Props) {
  const [isShow, setisShow] = useState(false);
    // const [currentUser, setCurrentUser] = useGlobalState("currentUser");
  const [CommentsChild] = useGlobalState("commentschild");
// console.log("CommentsChild", CommentsChild)
  const CommentsChildData = CommentsChild.CommentsData;
  
  const restTotal = CommentsChild.totalChild - 3 * CommentsChild.currentPage;

  function handleLoadMore(evt: any) {
    evt.preventDefault();
    // dispatch(actFetchCommentsParentAsync({ page: currentPage + 1, post: postId, exclude }));
  }

  function handleShowComment() {
    setisShow(!isShow);
  }

  return (
    <li className={styles["item"]}>
      <div className={styles["comments__section"]}>
        <div className={styles["comments__section--avatar"]}>
          <a href="/">
            <img src={comment.author_data.avatar || '/assets/images/avatar1.jpg'} alt="" />
          </a>
        </div>
        <div className={styles["comments__section--content"]}>
          <a href="/" className={styles["comments__section--user"]}>
            {comment.author_data.nickname}
          </a>
          <p className={styles["comments__section--time"]}>{comment.date}</p>
          <div className={styles["comments__section--text"]} dangerouslySetInnerHTML={{ __html: comment.content.rendered }}></div>
          <i className={"ion-reply cursor-pointer " + styles["comments__section--reply"]} onClick={handleShowComment}></i>
        </div>
      </div>
      {/* Reply Comments */}
      { CommentsChildData && CommentsChildData.length > 0 &&(
        <ul className={styles["comments"]}>
          {CommentsChildData.map((commentChild: any) => (
            <div key={commentChild.id}>
              <div  className="comments__section--text" dangerouslySetInnerHTML={{ __html: commentChild.content.rendered }}></div>
            </div>
            // <CommentItem key={commentChild.id} comment={commentChild} />
          ))}
        </ul>
      )}
       <CommentForm parentId={comment.id} showForm={isShow}/>
      {restTotal > 0 && (
        <div className={styles["comments__hidden"]}>
          <a href="/" onClick={handleLoadMore}>
            <i className={styles["icons"] + " ion-ios-undo"} /> Xem thêm {restTotal} câu trả lời
          </a>
        </div>
      )}
    </li>
  );
}
