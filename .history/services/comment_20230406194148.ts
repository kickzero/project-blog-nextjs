import API from './api';

const commentService = {
  getList({ page = 1, per_page = 5, post = null, parent = 0, exclude }: any) {
    return API.call().get('/wp/v2/comments', {
      params: {
        per_page,
        page,
        post,
        parent,
        order: 'asc',
        exclude
      },
    });
  },
  addNewItem( {author, content, post = null, parent = 0}: any ){
    return API.callWithToken().post('/wp/v2/comments', {
      author: author, 
      content: content, 
      post: post, 
      parent: parent
    })
  }
};

export default commentService;
