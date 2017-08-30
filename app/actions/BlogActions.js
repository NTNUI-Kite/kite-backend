import AppDispatcher from '../dispatcher/AppDispatcher';
import BlogConstants from '../constants/BlogConstants';
import {GetRequest} from '../utilities/APIFunctions';

const Actions = {
  getPosts: () => {
    GetRequest('/api/allBlogPosts')
    .then(posts =>{
      AppDispatcher.dispatch({
        actionType: BlogConstants.RECIEVE_POSTS,
        posts: posts
      });
    })
    .catch(message =>{
      AppDispatcher.dispatch({
        actionType: BlogConstants.RECIEVE_POSTS_ERROR,
        message: message
      });
    });
  }
}

export default Actions;
