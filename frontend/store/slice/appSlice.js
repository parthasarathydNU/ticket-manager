import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// Initial state
const initialState = {
    leftDrawerOpen: false,
    currentView : 'Login',
    userDetails: {}
 }

// Actual Slice
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {

    // Action to toggle the left drawer open state
    openLeftDrawer(state, action) {
      state.leftDrawerOpen = !state.leftDrawerOpen;
    },
    setCurrentView(state , action) {
      state.currentView = action.payload;
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    /**
     * Basically, when any page refresh occurs, if you navigate from one page to another page, 
     * or the getStaticProps or the getServerSideProps functions are called, a HYDRATE action 
     * will be dispatched at that moment. The payload of this action will contain the state at 
     * the moment of static generation or server-side rendering, so your reducer must merge it 
     * with the existing client state properly.
     */
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
  },
});

export const { openLeftDrawer , setCurrentView, setUserDetails} = appSlice.actions;


export default appSlice.reducer;