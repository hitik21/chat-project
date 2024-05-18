
import { createStore, combineReducers,applyMiddleware} from 'redux';
import chatReducer from './reducers/chatReducer';
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({
  chat: chatReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
