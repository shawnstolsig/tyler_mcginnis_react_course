import { savePollAnswer } from '../utils/api'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const REMOVE_ANSWER = 'REMOVE_ANSWER'

// Shape of User: 
// sarah_edo: {
//     id: 'sarah_edo',
//     name: 'Sarah Drasner',
//     avatarURL: 'https://tylermcginnis.com/would-you-rather/sarah.jpg',
//     answers: {
//       "8xf0y6ziyjabvozdd253nd": 'a',
//       "6ni6ok3ym7mf1p33lnez": 'a',
//       "am8ehyc8byjqgar0jgpub9": 'b',
//       "loxhs1bqm25b708cmbf3g": 'd'
//     },
//     polls: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
//   }

function receiveUsers(users){
    return {
        type: RECEIVE_USERS,
        users
    }
}

function addAnswer(answer){
    return {
        type: ADD_ANSWER,
        answer
    }
}

function removeAnswer(answer){
    return {
        type: REMOVE_ANSWER,
        answer
    }
}

// savePollAnswer needs {authedUser, id, answer}
// where authedUser is the user's id, id is the poll's id, and answer is a string a/b/c/d
export function handleAddAnswer(answer){
    return (dispatch) => {

        // add answer to the store
        dispatch(addAnswer(answer))

        // add answer to the db
        savePollAnswer(answer)
        .then(()=> {
            // something to update UI?  or just delete this .then()
        })
        .catch(() => {
            // remove answer from the store if error
            alert("Failed to add answer to db.")
            dispatch(removeAnswer(answer))
        })
    }
}