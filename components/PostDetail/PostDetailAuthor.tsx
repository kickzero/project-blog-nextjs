import styles from './post-author.module.css'

export default function PostDetailAuthor({PostDetails}: any) {
  return (
    <div className={styles["post-author"]}>
      <div className={styles["post-author__bg-avatar"]}>
        <a href="#" className={styles["post-author__avatar"]}>
          <img src={PostDetails.author_data?.avatar || "/assets/images/blog-detail.jpg"} alt="" />
        </a>
      </div>
      <div className={styles["post-author__nickname"]}>
        <a href="#">{PostDetails.author_data?.nickname}</a>
      </div>
      <p className={styles["post-author__desc"]}>
        {PostDetails.author_data?.description ||
        <>Lorem ipsum, dolor sit amet conse ctetur adipi sicing elit.
        Necessitatibus, vel vero vel vero vel vero vel vero!</>}
      </p>
    </div>
  );
}
