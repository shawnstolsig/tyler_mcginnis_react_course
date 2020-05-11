import { ADD_TWEET, TOGGLE_LIKE } from '../actions/tweets'
import { RECEIVE_DATA } from '../actions/shared'


export default function tweetReducer(state = {}, action){
    switch(action.type){
        case RECEIVE_DATA:
            return {
                ...state,
                ...action.tweets
            }
        case ADD_TWEET: 

            // return different object if adding reply
            if(action.tweet.replyingTo){
                const newReplies = state[action.tweet.replyingTo].replies.concat([action.tweet.id])

                return {
                    ...state,
                    [action.tweet.id]: {
                        ...action.tweet
                    },
                    [action.tweet.replyingTo]: {
                        ...state[action.tweet.replyingTo],
                        replies: newReplies
                    }
                }
            }

            return {
                ...state,
                [action.tweet.id]: {
                    ...action.tweet
                }
            }

        case TOGGLE_LIKE: 
            // get the existing likes array for the tweet
            let newLikesArray = state[action.id].likes
            
            // if toggle is adding like
            if(action.hasLiked){
                newLikesArray = newLikesArray.concat([action.authedUser])
            }
            else {
                newLikesArray = newLikesArray.filter((user) => user !== action.authedUser)
            }

            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    likes: newLikesArray
                }
            }
        default:
            return state
    }
}