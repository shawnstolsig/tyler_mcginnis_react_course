import API from 'goals-todos-api'
export const ADD_GOAL = 'ADD_GOAL'
export const REMOVE_GOAL = 'REMOVE_GOAL'

function addGoal(goal) {
    return {
        type: ADD_GOAL,
        goal,
    }
}

function removeGoal(id) {
    return {
        type: REMOVE_GOAL,
        id,
    }
}

export function handleGoalAdd(inputValue, setInputValue) {
    return (dispatch) => {

        return API.saveGoal(inputValue)
            .then((goal) => {
                dispatch(addGoal(goal))
                setInputValue('')
            })
            .catch(() => alert("Failed to save goal, please try again."))
    }
}

export function handleDeleteGoal(goal) {
    return (dispatch) => {
        dispatch(removeGoal(goal.id))
        return API.deleteGoal(goal.id)
            .catch(() => {
                alert("Failed to delete Goal")
                dispatch(addGoal(goal))
            })
    }
}

