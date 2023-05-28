import React, { useState } from "react";

import styles from "./comments.module.css";
import { useGlobalState } from "@/state";
import commentService from "@/services/comment";
import { formatComment } from "@/helper/formatApi";

export default function ReplyForm({ postId, commentId }: { postId: number; commentId: number }) {
  const currentUser = useGlobalState("user")[0];
  const [replies, setReplies] = useGlobalState("replies");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleReply = () => {
    setLoading(true);
    if (!loading) {
      commentService.addNewItem({ author: currentUser.id, content, postId: postId, parent: commentId }).then((res) => {
        const replyComment = formatComment(res.data);
        setReplies({
          ...replies,
          [commentId]: {
            ...replies[commentId],
            totalComment: (replies[commentId]?.totalComment || 0) + 1,
            comments: [...replies[commentId]?.comments, replyComment],
            exclude: [...replies[commentId]?.exclude, replyComment?.id],
          },
        });
        setLoading(false);
        setContent("");
      });
    }
  };
  return (
    <div className={styles["comments__form"]}>
      <div className={styles["comments__form--control"]}>
        <div className={styles["comments__section--avatar"]}>
          <a href="/">
            <img src={currentUser.simpleLocalAvatar.full || '/assets/images/avatar1.jpg'} alt="" />
          </a>
        </div>
        <textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        />
      </div>
      <div className="text-right">
        <Button loading={loading} className="btn btn-default" onClick={handleReply}>
          Submit
        </Button>
      </div>
    </div>
  );
}
