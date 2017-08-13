import AppDispatcher from '../dispatcher/AppDispatcher';
import BlogConstants from '../constants/BlogConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _posts = [];

function setPosts(posts){
  _posts = posts;
}

class BlogStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getPosts(){
    return _posts;
  }
}

const BlogStore = new BlogStoreClass();

BlogStore.dispatchToken = AppDispatcher.register(action =>{
  switch(action.actionType) {
    case BlogConstants.RECIEVE_POSTS:
      setPosts(action.posts);
      BlogStore.emitChange();
      break

    case BlogConstants.RECIEVE_POSTS_ERROR:
      alert(action.message);
      BlogStore.emitChange();
      break

    default:
  }
});

export default BlogStore;
