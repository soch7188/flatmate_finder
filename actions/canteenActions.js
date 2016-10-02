var axios = require('axios');
const getFoodDetailRoute = '/api/menu/(foodid)';
const getCanteenDataRoute = 'api/getCanteenList?restaurantId=(p1)';
const getSearchResultRoute = '/api/query_search?query=(queryString)';
const getFilterResultRoute = '/api/filter_search';

function fetchingData(){
    return{
        type:'FETCHING_DATA'
    }
}

function receiveFoodDetailData(json){
    return{
        type: 'RECIEVED_FOOD_DETAIL_DATA',
        data: json.data
    }
}
function receiveCanteenData(json){
    return{
        type: 'RECIEVED_CANTEEN_DATA',
        data: json.data
    }
}
function receiveSearchData(json){
    return{
        type: 'RECIEVED_SEARCH_DATA',
        data: json.data
    }
}
function receiveFilterData(json){
    return{
        type: 'RECEIVED_FILTER_DATA',
        data: json.data
    }
}

function requestFail(error){
    return{
        type: 'REQUEST_ERROR',
        error: error
    }
}

export function getFoodDetail(foodid) {
    const api = getFoodDetailRoute.replace('(foodid)',foodid);
    return dispatch=>{
        dispatch(fetchingData());
        return axios.get(api).then(json=>dispatch(receiveFoodDetailData(json))).catch(err=>dispatch(requestFail(err)))
    }
}

export function getCanteenData(canteenid){
    const api = getCanteenDataRoute.replace('(p1)',canteenid);
    return dispatch=>{
        dispatch(fetchingData());
        return axios.get(api).then(json=>dispatch(receiveCanteenData(json))).catch(err=>dispatch(requestFail(err)))
    }
}

export function getSearchReult(query){
    const api = getSearchResultRoute.replace('(queryString)',query);
    console.log(api);
    return dispatch=>{
        dispatch(fetchingData());
        return axios.get(api).then(json=>dispatch(receiveSearchData(json))).catch(err=>dispatch(requestFail(err)))
    }
}
export function getFilterResult(filterOptions){
    console.log("getFilterResult");
    console.log(filterOptions);

    return dispatch=>{
        dispatch(fetchingData());
        return axios({
            method: 'post',
            url:getFilterResultRoute,
            data: {
                filterOptions
            }
        }).then(json=>dispatch(receiveFilterData(json))).catch(err=>dispatch(requestFail(err)))
    }
}