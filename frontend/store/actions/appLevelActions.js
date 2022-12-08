/**
 * store/Actions/appLevelActions.js
 * 
 * This file contains all the actions that can be done on the contacts
 * state present in the store
 * 
 */

 export const AppLevelActionsType = {
    OPEN_LEFT_DRAWER: '[Left Drawer] Open'
}

/**
 * An actin takes in the payload as an input and returns 
 * type and payload as the output
 */

export const openLeftDrawer = (payload) => ({type: AppLevelActionsType.OPEN_LEFT_DRAWER, payload});
