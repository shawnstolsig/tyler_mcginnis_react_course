import { NEW_TWEET } from '../actions/tweets'
import { RECEIVE_DATA } from '../actions/shared'


export default function tweetReducer(state = {}, action){
    switch(action.type){
        case RECEIVE_DATA:
            return {
                ...state,
                ...action.tweets
            }
        default:
            return state
    }
}