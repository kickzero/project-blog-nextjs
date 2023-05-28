
import styles from "./article-item.module.css"
export default function ArticleItemDesc({post}: any) {
  return (
    <p className={styles["article-item__desc"]}>
      {post.author_data?.description}
    </p>
  );
}
