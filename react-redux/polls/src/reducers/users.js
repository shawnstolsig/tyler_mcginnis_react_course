import { RECEIVE_USERS, ADD_ANSWER, REMOVE_ANSWER } from '../actions/users'
import { ADD_POLL } from '../actions/polls'

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
        case ADD_POLL:
            const poll = action.poll
            const { author, id } = poll
            return {
                ...state,                                   // spread existing users
                [author]: {                                 // except change this specific user
                    ...state[author],                       // keep most of their data
                    polls: state[author].polls.concat([id]) // but for their polls array, concat a new array (containing on element, id) to the old array
                }
            }
        default:
            return state
    }
}