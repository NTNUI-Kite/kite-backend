import AppDispatcher from '../dispatcher/AppDispatcher';
import BlogConstants from '../constants/BlogConstants';
import {getRequest} from '../utilities/APIFunctions';

const Actions = {
  getPosts: () => {
    getRequest('/api/allBlogPosts')
    .then(posts =>{
      AppDispatcher.dispatch({
        actionType: BlogConstants.RECIEVE_POSTS,
        posts: posts
      });
    })
    .catch(message =>{
      console.log(message);
      AppDispatcher.dispatch({
        actionType: BlogConstants.RECIEVE_POSTS_ERROR,
        message: message
      });
    });
  }
}

export default Actions;
