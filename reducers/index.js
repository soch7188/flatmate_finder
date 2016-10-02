import {combineReducers} from 'redux'
import canteens from './canteenReducer'
import uiStates from './uiReducer'

export default combineReducers({
    canteens,
    uiStates,
});
