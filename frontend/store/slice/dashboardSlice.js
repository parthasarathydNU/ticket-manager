import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const cardTypes = {
    unresolved: "unresolved",
    overdue: "overdue",
    dueToday: "dueToday",
    open: "open",
    // onHold: "onHold",
    unassigned: "unassigned"
}

// Initial state
const initialState = {
    cards : [
        {
            type: cardTypes.unresolved,
            number: 0
        },
        {
            type: cardTypes.overdue,
            number: 1
        },
        {
            type: cardTypes.dueToday,
            number: 2
        },
        {
            type: cardTypes.open,
            number: 3
        },
        {
            type: cardTypes.unassigned,
            number: 5
        }

    ]
 }

// Actual Slice
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {

    // // Action to toggle the left drawer open state
    // openLeftDrawer(state, action) {
    //   state.leftDrawerOpen = !state.leftDrawerOpen;
    // },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    /**
     * Basically, when any page refresh occurs, if you navigate from one page to another page, 
     * or the getStaticProps or the getServerSideProps functions are called, a HYDRATE action 
     * will be dispatched at that moment. The payload of this action will contain the state at 
     * the moment of static generation or server-side rendering, so your reducer must merge it 
     * with the existing client state properly.
     */
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload
        };
      },
    },

  },
});

// export const { openLeftDrawer } = appSlice.actions;


export default dashboardSlice.reducer;