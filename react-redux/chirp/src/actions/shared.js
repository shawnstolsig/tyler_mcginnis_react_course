import { getInitialData } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_DATA = 'RECEIVE_DATA'

function receiveData(users, tweets){
    return {
        type: RECEIVE_DATA,
        users,
        tweets
    }
}

export function handleInitialData(){
    return (dispatch) => {
        dispatch(showLoading())
        getInitialData()
            .then(({users, tweets}) => dispatch(receiveData(users, tweets)))
            .then(() => dispatch(hideLoading()))
    }
}