import { RECEIVE_USERS } from '../actions/users'
import { ADD_ANSWER } from '../actions/answers'
import { ADD_POLL } from '../actions/polls'

export default function userReducer(state = {}, action){
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_ANSWER:
            const user = state[action.authedUser]
            return {
                ...state,
                [action.authedUser]: {
                    ...user,
                    answers: user.answers.concat([action.id])
                }
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