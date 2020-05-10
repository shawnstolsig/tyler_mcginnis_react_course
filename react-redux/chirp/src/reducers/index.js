import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'

import tweetReducer from '../reducers/tweets'
import usersReducer from '../reducers/users'
import authedUserReducer from '../reducers/authedUser'

export default combineReducers({
    tweets: tweetReducer,
    users: usersReducer,
    authedUser: authedUserReducer,
    loadingBar: loadingBarReducer
})