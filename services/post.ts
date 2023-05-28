import API from "./api"

type GetPagingPostInput = {
  page: number,
  extraParam: {
    [key: string]: unknown
  }
}

const postService = {
  getAll(inputParams = {}) {
    return API.call().get('/wp/v2/posts', {
      params: {
        ...inputParams,
        lang: 'vi',
      },
    });
  },
  getArticlesLatest() {
    return this.getAll({ per_page: 3, page: 1,});
  },
  getArticlesPopular() {
    return this.getAll({ per_page: 3, page: 1, orderby: 'post_views',});
  },
  getArticlesPaging({ page, extraParam }: GetPagingPostInput) {
    return this.getAll({ page: page, ...extraParam });
  },
  getArticleDetail(slug: any) {
    return this.getAll({ slug });
  },
  getArticleRelated(author: any, exclude: any) {
    return this.getAll({ per_page: 3, page: 1, author, exclude });
  },
}


export default postService;