import Link from "next/link";

import styles from "./article-item.module.css"

export default function ArticleItemTitle({post}: any) {
  return (
    <h2 className={styles["article-item__title"]}>
      <Link href="/posts/[postId]" as={`/posts/${post.slug}`}>{post.title?.rendered}</Link>
    </h2>
  );
}
