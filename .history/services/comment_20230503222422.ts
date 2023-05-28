import API from './api';

type GetCommentsInput = {
  page: number,
  perPage?: number,
  postId: number,
  parent?: number,
  exclude: number[],
}
type SendCommentInput = {
  author: number,
  content: string,
  post: number,
  parent: number
}

const commentService = {
  getList({ page = 1, perPage = 5, post = null, parent = 0, exclude }: GetCommentsInput) {
    return API.call().get('/wp/v2/comments', {
      params: {
        per_page: perPage,
        page,
        post,
        parent,
        order: 'asc',
        exclude
      },
    });
  },
  addNewItem( {author, content, post , parent = 0}: SendCommentInput ){
    return API.callWithToken().post('/wp/v2/comments', {
      author: author, 
      content: content, 
      post: post, 
      parent: parent
    })
  }
};

export default commentService;
