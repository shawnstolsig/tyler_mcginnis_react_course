import { RECEIVE_USERS, ADD_ANSWER, REMOVE_ANSWER } from '../actions/users'

export default function userReducer(state = {}, action){
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_ANSWER:
            return {
                ...state
            }
        case REMOVE_ANSWER:
            return {
                ...state
            }
        default:
            return state
    }
}