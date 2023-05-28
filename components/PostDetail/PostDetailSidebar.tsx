import PostDetailAuthor from "./PostDetailAuthor";
import PostDetailRelated from "./PostDetailRelated";
import styles from "./post-detail.module.css";

export default function PostDetailSidebar({PostDetails, PostRelateds}: any) {
  return (
    <div className={styles["post-detail__side"]}>
      <PostDetailAuthor PostDetails={PostDetails}/>
      <div className="spacing" />
      <PostDetailRelated PostRelateds={PostRelateds}/>
    </div>
  );
}
