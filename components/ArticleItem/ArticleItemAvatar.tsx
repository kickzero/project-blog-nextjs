import styles from "./article-item.module.css"

export default function ArticleItemAvatar({post}: any) {
  return (
    <div className={styles["article-item__author-image"]}>
      <a aria-label="John Doe" href="/">
        <img src={post.author_data.avatar || "/assets/images/john-doe.png"} width="48" height="48" alt={post.author_data.avatar || "/assets/images/john-doe.png"} />
      </a>
    </div>
  );
}
