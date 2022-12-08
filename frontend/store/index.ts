/**
 * /Store/index.js
 * 
 * This file contains the redux store
 * 
 * Reference articles and blogs
 * 
 * https://medium.com/@bhavaypuri15/redux-setup-in-nextjs-1e476ac813fd
 * 
 * https://blog.logrocket.com/use-redux-next-js/
 * 
 */

 import { configureStore, combineReducers } from "@reduxjs/toolkit";
 import { appSlice } from "./slice/appSlice";
 import { dashboardSlice } from './slice/dashboardSlice'
 import { createWrapper } from "next-redux-wrapper";
 import {ticketManagementSlice} from './slice/ticketManagementSlice'


 //combining reducer
const rootReducer = combineReducers({
    app: appSlice.reducer, //calling the reducer file,
    dashboard: dashboardSlice.reducer ,
    ticketManagement : ticketManagementSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
}),
});

 const makeStore = () => store;
  

 
 /**
  * We use the configureStore function from the reduxjs toolkit library
  * And we use the reducers we have already defined to the store 
  */
//  const store = configureStore({
//      reducer: {
//          appLayout:appLayoutReducer
//      }
//  })
 
 export const wrapper = createWrapper(makeStore);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
