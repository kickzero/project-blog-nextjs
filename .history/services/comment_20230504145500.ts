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
  postId: number,
  parent: number
}

const commentService = {
  getList({ page = 1, perPage = 5, postId, commentId = 0, exclude }: GetCommentsInput) {
    return API.call().get('/wp/v2/comments', {
      params: {
        per_page: perPage,
        page,
        post: postId,
        parent: commentId,
        order: 'asc',
        exclude
      },
    });
  },
  addNewItem( {author, content, postId, parent = 0}: SendCommentInput ){
    return API.callWithToken().post('/wp/v2/comments', {
      author, 
      content, 
      post: postId, 
      parent
    })
  }
};

export default commentService;
