
import { PostType } from '@/helper/formatApi';
import { ArticleItem } from '../ArticleItem';
import Button from '../shared/Button/Button';
import { MainTitle } from '../shared/MainTitle';
import usePostPaging from '@/hooks/usePostPaging';

// export type PostType = {
//   id: string;
// }

type ArticleGeneralDataProps = {
  listPosts: PostType[];
}

function ArticleGeneral({ listPosts }: { listPosts: PostType[] }) {
  const { posts, isLastPage, loadMore, loading } = usePostPaging({ initialPost: listPosts, extraParam: { per_page: 2 }, triggerChange: "ArticleGeneral" });
  return (
    <div className="articles-list section">
      <div className="tcl-container">
        {/* Main Title */}
        <MainTitle btnLabel="Xem them">Bai Viet Tong Hop</MainTitle>
        {/* End Main Title */}
        {/* End Row News List */}
        <div className="tcl-row">
          
          {
            posts.map((post: any) => (
              <div key={post.id} className="tcl-col-12 tcl-col-md-6">
                <ArticleItem isStyleCard isShowAvatar={false} post={post}/>
              </div>
            ))
          } 
          
        </div>
        {/* End Row News List */}
        <div className="text-center">
          {!isLastPage && (
            <Button theme="primary" size="large" loading={loading} onClick={loadMore}>
              Tải thêm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleGeneral;
