import { useGlobalState } from "@/state";
import { MainTitle } from "../shared/MainTitle";
import usePostPaging from "@/hooks/usePostPaging";
import { Button } from "../shared/Button";
import { ArticleItem } from "../ArticleItem";
import styles from "../ArticleItem/article-item.module.css"


type Props = {
  categoryPosts: any;
  categoryId: string;
  totalPost: number;
};

export default function CategoryPost({ categoryPosts, categoryId, totalPost }: Props) {

  const categories = useGlobalState("categories")[0];
  const { posts, isLastPage, loadMore, loading } = usePostPaging({ initialPost: categoryPosts, extraParam: { per_page: 2, categories: categoryId }, triggerChange: categoryId });
  return (
    <div className="tcl-container">
      {categories[categoryId] && (
       <MainTitle type="search">
        <p className="text-center">
          {totalPost} kết quả tìm kiếm với thể loại "{categories[categoryId]?.name}"
        </p>
      </MainTitle>
      )}
      {!categories[categoryId] && (
        <MainTitle type="search">
          <p className="text-center">
            {totalPost} kết quả tìm kiếm với thể loại "{categoryId}"
          </p>
        </MainTitle>
      )}

      <div className="tcl-row tcl-jc-center">
        {posts.map((e: any) => {
          return (
            <div className={"tcl-col-12 tcl-col-md-8 " + styles["mb-30px"]} key={e.id}>
              <ArticleItem isStyleCard isShowCategoies={true} isShowAvatar={false} isShowDesc={false} post={e} />
            </div>
          );
        })}
      </div>

      <div className="text-center">
        {!isLastPage && (
          <Button theme="primary" size="large" loading={loading} onClick={loadMore} className="mt-4">
            Tải thêm
          </Button>
        )}
      </div>
    </div>
  );
}
