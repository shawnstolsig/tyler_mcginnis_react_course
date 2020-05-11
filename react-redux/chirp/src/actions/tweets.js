import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_TWEET = "ADD_TWEET"
export const TOGGLE_LIKE = "TOGGLE_LIKE"

function toggleLike({id, hasLiked, authedUser}){
    return {
        type: TOGGLE_LIKE,
        id,
        hasLiked,
        authedUser
    }
}

function addTweet(tweet){
    return {
        type: ADD_TWEET,
        tweet
    }
}

// input info object has shape { id, hasLiked, authedUser }
export function handleToggleLike(info){
    return (dispatch) => {
        dispatch(toggleLike(info))
        saveLikeToggle(info)
        .catch(() => dispatch(toggleLike(info)))
    }
}

// input info object has shape { text, author, replyingTo }
export function handleAddTweet(info){
    return (dispatch) => {
        dispatch(showLoading())
        saveTweet(info)
            .then((tweet) => dispatch(addTweet(tweet)))
            .then(() => dispatch(hideLoading()))
    }
}