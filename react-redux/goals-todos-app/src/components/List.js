import React from 'react'
import { connect } from 'react-redux'
import { handleDeleteGoal } from '../actions/goals'
import { handleToggleTodo, handleDeleteTodo } from '../actions/todos'

function List({ items, type, toggleFunc, dispatch }) {
    return (
        <ul>
            {items.map((item) => (
                <li
                    key={item.id}
                    style={{ textDecoration: item.complete ? 'line-through' : 'none' }}
                >
                    <span onClick={toggleFunc ? () => dispatch(handleToggleTodo(item.id)) : null}>{item.name}</span>
                    <button
                        onClick={type === 'todo'
                            ? () => dispatch(handleDeleteTodo(item))
                            : () => dispatch(handleDeleteGoal(item))}
                    >X
            </button>
                </li>
            ))}
        </ul>
    )
}

export default connect((state) => ({
    goals: state.goals,
    todos: state.todos
}))(List)