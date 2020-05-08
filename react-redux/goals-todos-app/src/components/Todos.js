import React from 'react'
import { connect } from 'react-redux'
import List from './List'
import {
    handleTodoAdd,
} from '../actions/todos'





function Todos({ dispatch, todos }) {
    const [inputValue, setInputValue] = React.useState('')

    const handleChange = (e) => setInputValue(e.target.value)
    const addReactTodo = () => {
        dispatch(handleTodoAdd(inputValue, setInputValue))
    }

    return (
        <div>
            <h1>Todos</h1>
            <input type="text" placeholder="Add todo" onChange={handleChange} value={inputValue} />
            <button onClick={addReactTodo}>Add todo</button>
            <List
                items={todos}
                type='todo'
                toggleFunc={true}
            />
        </div>
    )
}

export default connect((state) => ({
    todos: state.todos
}))(Todos)