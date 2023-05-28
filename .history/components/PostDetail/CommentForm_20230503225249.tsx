import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { actFetchNewItemAsync } from '../../store/comment/actions';
import styles from "./comments.module.css";
import Link from 'next/link';
import { Button } from '../shared/Button';
import { useGlobalState } from '@/state';
import commentService from '@/services/comment';
import { formatComment } from '@/helper/formatApi';

function CommentForm({ postId }: { postId: number }) {
  console.log("postId", postId)
  const [loading, setLoading] = useState(false);
  const currentUser = useGlobalState("user")[0];
  const [commentsPaging, setCommentsPaging] = useGlobalState("commentsPaging");
  const [commentInput, setCommentInput] = useState("");

  if(!loading) return <></>;

  // function handleChange(event: any) {
  //   setContent(event.target.value);
  // }

  const submitComment = ({ author = currentUser?.id, content = commentInput }) => {
    setLoading(true);
    if (!loading) {
      commentService.addNewItem({ author, content, postId, parent: 0 }).then((res) => {
        console.log("res", res)
        const comment = formatComment(res.data);
        setCommentsPaging({
          ...commentsPaging,
          exclude: [...commentsPaging.exclude, comment.id],
          comments: [comment, ...commentsPaging.comments],
          totalComment: commentsPaging.totalComment + 1,
        });
        setCommentInput("");
        setLoading(false);
      });
    }
  };

  // console.log("currentUser", currentUser.simple_local_avatar?.full)
  if( !currentUser ) return (
    <p>Vui lòng <Link href="/login">Đăng nhập</Link> để bình luận</p>
  );
  return (
    <div className={styles["comments__form"]}>
      <div className={styles["comments__form--control"]}>
        <div className={styles["comments__section--avatar"]}>
          <a href="/">
            <img src={currentUser.simpleLocalAvatar?.full} alt="" />
            {/* <ImageCustom src={currentUser.simpleLocalAvatar?.full} width={35} height={35}></ImageCustom> */}
          </a>
        </div>
        <textarea
          onChange={(e) => {
            setCommentInput(e.target.value);
          }}
          value={commentInput}
        />
      </div>
      <div className="text-right">
        <Button loading={loading} className="btn btn-default" onClick={submitComment}>
          Submit
        </Button>
      </div>
    </div>
  );
  // return (
  //   <div className={styles["comments__form"]}>
  //     <div className={styles["comments__form--control"]}>
  //       <div className={styles["comments__section--avatar"]}>
  //         <a href="/">
  //           <img src={currentUser.simple_local_avatar?.full} alt="" />
  //         </a>
  //       </div>
  //       <textarea name="comment" onChange={handleChange}/>
  //     </div>
  //     <div className="text-right">
  //       <Button onClick={handleSubmit} loading={loading}>Bình luận</Button> 
  //     </div>
  //   </div>
  // );
}

export default CommentForm;
