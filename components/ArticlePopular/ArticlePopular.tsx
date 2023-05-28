
import { ArticleItem } from "../ArticleItem";
import { MainTitle } from "../shared/MainTitle";
import styles from "./popular-news-list.module.css"

function ArticlePopular({listPosts}: any) {

  return (
    <div className="popular-news section bg-white-blue">
      <div className="tcl-container">
        {/* Main Title */}
        <MainTitle btnLabel="Xem them">Popular Articles</MainTitle>
        {/* End Main Title */}
        <div className={`${styles["popular-news__list"]} spacing`}>
          <div className={styles["popular-news__list--left"]}>
            <div className={styles["popular-news__list--row"]}>
              {/* Popular news card */}
              <div className={styles["popular-news__list--card"]}>
                <ArticleItem isStyleCard isShowCategoies isShowDesc post={listPosts[0]}/>
              </div>
              {/* End Popular news card */}
              {/* Popular news card */}
              <div className={styles["popular-news__list--card"]}>
                <ArticleItem isStyleCard isShowCategoies isShowDesc post={listPosts[1]}/>
              </div>
              {/* End Popular news card */}
            </div>
          </div>
          <div className={styles["popular-news__list--right"]}>
            <div className={styles["popular-news__list--row"]}>
              {/* Popular news card */}
              <div className={styles["popular-news__list--card"]}>
                <ArticleItem isStyleCard isStyleRow isShowDesc post={listPosts[2]}/>
              </div>
              {/* End Popular news card */}
            </div>
          </div>
        </div>
        {/* <div className="popular-news__list spacing">
          <div className="popular-news__list--left">
            <div className="popular-news__list--row">
           
              <div className="popular-news__list--card">
                <ArticleItem isStyleCard isShowCategoies isShowDesc post={listPosts[0]} />
              </div>
             
              <div className="popular-news__list--card">
                <ArticleItem isStyleCard isShowCategoies isShowDesc post={listPosts[1]} />
              </div>
           
            </div>
          </div>
          <div className="popular-news__list--right">
            <div className="popular-news__list--row">
          
              <div className="popular-news__list--card">
                <ArticleItem isStyleCard isStyleRow isShowDesc post={listPosts[2]} />
              </div>
             
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ArticlePopular;
