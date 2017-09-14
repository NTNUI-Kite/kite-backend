import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import BlogConstants from '../constants/BlogConstants';

const CHANGE_EVENT = 'change';

let posts = [];

function setPosts(newPosts) {
  posts = newPosts;
}

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getPosts"] }] */
class BlogStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getPosts() {
    return posts;
  }
}

const BlogStore = new BlogStoreClass();

BlogStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case BlogConstants.RECIEVE_POSTS:
      setPosts(action.posts);
      BlogStore.emitChange();
      break;

    case BlogConstants.RECIEVE_POSTS_ERROR:
      BlogStore.emitChange();
      break;

    default:
  }
});

export default BlogStore;
