import { RECEIVE_POLLS, ADD_POLL, REMOVE_POLL } from '../actions/polls'

export default function pollsReducer(state = {}, action){
    switch(action.type){
        case RECEIVE_POLLS:
            return {
                ...state,   
                ...action.polls
            }
        case ADD_POLL:
            return {
                ...state
            }
        case REMOVE_POLL: 
            return {
                ...state
            }
        default:
            return state
    }
}