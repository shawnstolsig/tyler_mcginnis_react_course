import { savePollAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_ANSWER = 'ADD_ANSWER'

function addAnswer({authedUser, id, answer}){
    return {
        type: ADD_ANSWER,
        authedUser,
        id,
        answer
    }
}

// savePollAnswer needs {authedUser, id, answer}
// where authedUser is the user's id, id is the poll's id, and answer is a string a/b/c/d
export function handleAddAnswer(answer){
    return (dispatch) => {
        dispatch(showLoading())
        return savePollAnswer(answer)
            .then(()=>  dispatch(addAnswer(answer)))
            .then(() => dispatch(hideLoading()))
    }
}