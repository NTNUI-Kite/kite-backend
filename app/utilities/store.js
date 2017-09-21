import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../utilities/indexReducer';

export default function configureStore() {
  const middleware = [
    thunk,
  ];

  const store = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(...middleware),

    ),
  );

  return store;
}
