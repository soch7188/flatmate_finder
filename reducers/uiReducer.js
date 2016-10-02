// import { push } from 'react-router-redux';
import { hashHistory } from 'react-router'
var _ = require('underscore');


const initialState = {
    isShowDrawer:false,
    isShowCanteenList:true,
    isSearch:false,
    isShowFilterModal: false,
    isAdvancedFilter: false,
    searchQuery:'',
    filterOptions:
        {
            'Restaurant':'Default',
            'Delivery Speed':'Default',
            'Offered Time':'Default',
            'Cuisine Type':'Default',
            'Taste Type':[],
            'Ingredient':[],
            'Sauce Type':[],
            'Without':[],
        },
};

export default function uiStates(state = initialState, action) {
    switch(action.type){
        case 'TOGGLE_NAV_DRAWER':
            return {...state, isShowDrawer: !state.isShowDrawer};
        case 'CLICK_CANTEEN_LIST':
            return {...state, isShowCanteenList: !state.isShowCanteenList};
        case 'TOGGLE_SEARCH_BUTTON':
            return {...state, isSearch: !state.isSearch};
        case 'SHOW_MODAL_FILTER':
            return {...state, isShowFilterModal: true};
        case 'HIDE_MODAL_FILTER':
            return {...state, isShowFilterModal: false};
        case 'CLICK_ADVANCED_FILTER':
            return {...state, isAdvancedFilter: !state.isAdvancedFilter};
        case 'INPUT_SEARCH_QUERY':
            return {...state, searchQuery: action.query};
        case 'SUBMIT_SEARCH_QUERY':
            // this.props.dispatch(push('/searchResult'));
            // http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
            hashHistory.push('/searchResult/'+state.searchQuery);
            return {...state, isSearch:true};
        case 'INPUT_FILTER_OPTIONS':
            var newFilterOption = _.extend({},state.filterOptions);
            newFilterOption[action.filterTitle] = action.filterValue;
            return {...state, filterOptions: newFilterOption};
        case 'SUBMIT_FILTER_SEARCH':
            //TODO change the url
            hashHistory.push('/filterResult/');

            return {...state, isSearch:false};
        default:
            return state;
    }
}