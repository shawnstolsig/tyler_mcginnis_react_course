import { RECEIVE_DATA } from '../actions/shared'

export default function usersReducer(state = {}, action){
    switch(action.type){
        case RECEIVE_DATA: 
            return {
                ...state,
                ...action.users
            }
        default: 
            return state
    }
}