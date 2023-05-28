
import PostDetailComments from "./PostDetailComments";
import PostDetailRichText from "./PostDetailRichText";
import PostDetailTags from "./PostDetailTags";
import styles from "./post-detail.module.css";

export default function PostDetailContent({PostDetails, Comments, CommentsChild}: any) {

  return (
    <div className={styles["post-detail__content"]}>
      <div className={styles["thumbnail"]}>
        <img src={PostDetails.featured_media_url} alt={PostDetails.featured_media_url} />
      </div>
      <div className={styles["content-padding"]}>
        {/* Post Detail rich text editor */}
        <PostDetailRichText PostDetails={PostDetails}/>
        {/* End Post Detail rich text editor */}
        {/* Post Detail Tags */}
        <PostDetailTags tags={PostDetails.categories}/>
        {/* End Post Detail Tags */}
        {/* Post Detail Comments */}
        <PostDetailComments Comments={Comments} PostDetails={PostDetails}/>
        {/* End Post Detail Comments */}
      </div>
    </div>
  );
}
