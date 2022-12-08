import AppState from '../State';
import {AppLevelActionsType} from '../actions/appLevelActions'

/**
 * Setting up the reducer function
 * 
 */

let appLayoutNewState = {}

const reducer = (state = AppState, action) => {
    const {type, payload} = action;


    switch(type) {
        case AppLevelActionsType.OPEN_LEFT_DRAWER :
            appLayoutNewState = {...state.appState};
            appLayoutNewState.leftDrawerOpen = !state.appState.leftDrawerOpen;
            break;
        default : 
        appLayoutNewState = {...state.appState};
            break;

    }

    return Object.assign({}, state, appLayoutNewState)
}

export default reducer