export function toggleNavDrawer(toggleFlag=null) {
    return{
        type: 'TOGGLE_NAV_DRAWER',
        value:toggleFlag
    }
}

export function clickCanteenListButton() {
    return{
        type: 'CLICK_CANTEEN_LIST'
    }
}

export function toggleSearchButton() {
    return{
        type: 'TOGGLE_SEARCH_BUTTON'
    }
}

export function showModalFilter() {
    return {
        type: 'SHOW_MODAL_FILTER'
    }
}

export function hideModalFilter() {
    return {
        type: 'HIDE_MODAL_FILTER'
    }
}

export function clickAdvancedFilter(){
    return{
        type: 'CLICK_ADVANCED_FILTER'
    }
}

export function inputSearchQuery(newQuery){
    return{
        type: 'INPUT_SEARCH_QUERY',
        query: newQuery
    }
}

export function submitSearchQuery(){
    return{
        type: 'SUBMIT_SEARCH_QUERY'
    }
}

export function inputFilterOptions(filterTitle, filterValue){
    return{
        type: 'INPUT_FILTER_OPTIONS',
        filterTitle: filterTitle,
        filterValue: filterValue
    }
}

export function submitFilterSearch(){
    return{
        type: 'SUBMIT_FILTER_SEARCH'
    }
}