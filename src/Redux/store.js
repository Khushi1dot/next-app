// REDUX(INJECT-MODEL)

import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import authReducer from "./models/auth/reducer";

const rootReducers = combineReducers({
  auth: authReducer,
 
});
const store = createStore(rootReducers, applyMiddleware(thunk));
export default store;



// REDUX TOOLKIT

// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './toolkit/counter/slice';
// import userReducer from './toolkit/users/userSlice'
// const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     user:userReducer,
//   }
// });

// export default store;
