import { ADD_TODO } from '../actions/todos'
import { ADD_GOAL } from '../actions/goals'


const checker = (store) => (next) => (action) => {
    if (action.type === ADD_TODO &&
        action.todo.name.toLowerCase().indexOf('bitcoin') !== -1
    ) {
        return alert("Nope, anything with Bitcoin is bad")
    }
    if (action.type === ADD_GOAL &&
        action.goal.name.toLowerCase().indexOf('bitcoin') !== -1
    ) {
        return alert("Nope, anything with Bitcoin is bad")
    }
    return next(action)
}

export default checker