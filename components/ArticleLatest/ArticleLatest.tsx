import { ArticleItem } from '../ArticleItem';
import { MainTitle } from '../shared/MainTitle';
import styles from "./latest-news-list.module.css"
// import './latest-news-list.css';

export type PostType = {
  id: string;
}

type ArticleLatestDataProps = {
  listPosts: PostType[];
}

const ArticleLatest = ({ listPosts }: ArticleLatestDataProps) => {
 
  return (
    <div className="latest-news section">
      <div className="tcl-container">
        <MainTitle>Bài viết mới nhất</MainTitle>

        <div className={`${styles["latest-news__list"]} spacing`}>
          {
            listPosts.map((post: any) => (
              <div key={post.id} className={styles["latest-news__card"]}>
                <ArticleItem post={post}/>
              </div>
            ))
          } 

          {/* <div className={styles["latest-news__card"]}>
            <ArticleItem />
          </div>

          <div className={styles["latest-news__card"]}>
            <ArticleItem />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ArticleLatest;
