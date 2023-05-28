// import './article-item.css';
import styles from "./article-item.module.css"
import cls from 'classnames';
import ArticleItemThumb from './ArticleItemThumb';
import ArticleItemCategories from './ArticleItemCategories';
import ArticleItemStats from './ArticleItemStats';
import ArticleItemTitle from './ArticleItemTitle';
import ArticleItemDesc from './ArticleItemDesc';
import ArticleItemInfo from './ArticleItemInfo';

type Props = {
  isStyleRow?: boolean;
  isStyleCard?: boolean;
  isShowDesc?: boolean;
  isShowCategoies?: boolean;
  isShowAvatar?: boolean;
  post: any;
};

export default function ArticleItem( {
  isStyleRow = false,
  isStyleCard = false,
  isShowDesc = false,
  isShowCategoies = false,
  isShowAvatar = true,
  post
}: Props ) {
  const classes = cls(styles['article-item'], {
    [styles['style-card']]: isStyleCard,
    [styles['style-row']]: isStyleRow,
  });
  if (!post) {
    return <></>;
  }
  return (
    <article className={classes}>
      <ArticleItemThumb post={post}/>
      <div className={styles["article-item__content"]}>
        {isShowCategoies && <ArticleItemCategories categoriesId={post.categories} />}
        {isShowCategoies && <ArticleItemStats/>}

        <ArticleItemTitle post={post}/>

        {isShowDesc && <ArticleItemDesc post={post}/>}
        
        <ArticleItemInfo post={post} isShowAvatar={isShowAvatar} />
      </div>
    </article>
  );
}
