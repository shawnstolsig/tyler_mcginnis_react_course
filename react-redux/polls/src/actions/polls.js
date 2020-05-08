import { savePoll } from '../utils/api'

export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const ADD_POLL = 'ADD_POLL'
export const REMOVE_POLL = 'REMOVE_POLL'

export function receivePolls(polls){
    return {
        type: RECEIVE_POLLS,
        polls
    }
}
function addPoll(poll){
    return {
        type: ADD_POLL,
        poll
    }
}
function removePoll(poll){
    return {
        type: REMOVE_POLL,
        poll
    }
}

// shape of poll: poll, a, b, c, d with text for question and answer
export function handleAddPoll(poll){
    return (dispatch) => {
        dispatch(addPoll(poll))
        savePoll(poll)
        .catch(() => dispatch(removePoll(poll)))
    }
}