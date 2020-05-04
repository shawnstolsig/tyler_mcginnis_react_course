
// Library code
function createStore(reducer){
    // store has four parts: 
    // 1. the state tree
    // 2. way to get state
    // 3. way to listen to changes on state
    // 4. way to update state


    // 1. the state tree
    let state
    let listeners = []      // a place to store callback functions passed in by subscribe

    // 2. way to get state
    const getState = () => state

    // 3. way to listen to changes on state
    const subscribe = (listener) => {
        listeners.push(listener)

        // we also want to pass a way for the user to unsubscribe (remove listener from listeners array), so we return this set of instructions
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    // 4. way to update state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}


// App code:

// Global constants to use instead of string action.type
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// Action creator functions
function addTodoAction(todo){
    return {
        type: ADD_TODO,
        todo,
    }
}
function removeTodoAction(id){
    return {
        type: REMOVE_TODO,
        id
    }
}
function toggleTodoAction(id){
    return {
        type: TOGGLE_TODO,
        id
    }
}
function addGoalAction(goal){
    return {
        type: ADD_GOAL,
        goal
    }
}
function removeGoalAction(id){
    return {
        type: REMOVE_GOAL,
        id
    }
}

// Reducer functions
function todosReducer(state = [], action){
    switch(action.type){
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO:
            // map over state, only toggle the todo of the specified id.  either return the original todo, or create a new todo with the complete flag toggled
            return state.map((todo) => todo.id !== action.id ? todo : 
                    // Object.assign: first argument is target object that will be returned, all the remaining are the source objects
                    Object.assign({}, todo, {complete: !todo.complete}))
        default :
            return state
    }
}

function goalsReducer(state = [], action){
    switch(action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id)
        default: 
            return state
    }

}

// a reducer to combine all of the app's reducers together.  defines shape of state object.
function appReducer(state = {}, action){
    return {
        todos: todosReducer(state.todos, action),
        goals: goalsReducer(state.goals, action)
    }
}   



// pass in the reducer function (as this will normally be a different module/js file than the store itself)
let store = createStore(appReducer)
store.dispatch(addTodoAction({
    id: 0,
    name: 'lose 20 lbs',
    complete: false
}))
store.dispatch(addTodoAction({
    id: 1,
    name: 'work out',
    complete: false
}))
store.getState()