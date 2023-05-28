// import { Link } from 'react-router-dom';
import styles from "./article-item.module.css"

type ArticleItemThumbData = {
  post: any
}

export default function ArticleItemThumb(props: ArticleItemThumbData) {
  return (
    <div className={styles["article-item__thumbnail"]}>
      <a href="/">
        <img src={props.post.featured_media_url || "assets/images/blog-1.jpg"} alt={props.post.featured_media_url || "assets/images/blog-1.jpg"}/>
      </a>
    </div>
  );
}
