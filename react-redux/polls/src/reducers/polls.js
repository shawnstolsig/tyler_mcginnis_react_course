import { RECEIVE_POLLS, ADD_POLL } from '../actions/polls'
import { ADD_ANSWER } from '../actions/answers'

export default function pollsReducer(state = {}, action){
    switch(action.type){
        case RECEIVE_POLLS:
            return {
                ...state,   
                ...action.polls
            }
        case ADD_ANSWER: 
            const { answer, id, authedUser } = action
            const poll = state[id]
            const votesKey = answer + "Votes"
            return {
                ...state, 
                [action.id]: {
                    ...poll,
                    [votesKey]: poll[votesKey].concat([authedUser])
                }
            }
        case ADD_POLL:
            return {
                ...state,                        // spreads old polls
                [action.poll.id]: action.poll    // adds new poll
            }
        default:
            return state
    }
}