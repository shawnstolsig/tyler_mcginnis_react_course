export const SET_AUTHED_USER = "SET_AUTHED_USER"

function addAuthedUser(id){
    return {
        type: SET_AUTHED_USER,
        id
    }
}

export function setAuthedUser(id){
    return (dispatch) => {
        dispatch(addAuthedUser(id))
    }
}