import styles from "./post-detail.module.css";

export default function PostDetailHead({PostDetails}: any) {

  return (
    <div className={styles["post-detail__head"]}>
    <div className="tcl-container">
      <h1 className={styles["post-detail__title"]}>
          {PostDetails.title?.rendered}
      </h1>
      <ul className={styles["post-detail__info"]}>
        <li className={styles["item"] + " author"}>
          By{" "}
          <a href="#">
            <strong>{PostDetails.author_data?.nickname}</strong>
          </a>
        </li>
        <li className={styles["item"] + " date"}>{PostDetails.date}</li>
        <li className={styles["item"] + " views"}>
          {PostDetails.view_count} <i className="icons ion-ios-eye" />
        </li>
        <li className={styles["item"] + " comments"}>
          {PostDetails.comment_count} <i className="icons ion-ios-chatbubble" />
        </li>
      </ul>
    </div>
  </div>
  );
}
