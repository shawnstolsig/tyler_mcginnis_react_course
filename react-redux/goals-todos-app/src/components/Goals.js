import React from 'react'
import { connect } from 'react-redux'
import List from './List'
import {
    handleGoalAdd,
} from '../actions/goals'



function Goals({ dispatch, goals }) {
    const [inputValue, setInputValue] = React.useState('')

    const handleChange = (e) => setInputValue(e.target.value)
    const addReactGoal = () => {
        dispatch(handleGoalAdd(inputValue, setInputValue))
    }

    return (
        <div>
            <h1>Goals</h1>
            <input type="text" placeholder="Add goal" onChange={handleChange} value={inputValue} />
            <button onClick={addReactGoal}>Add goal</button>
            <List
                items={goals}
                type='goal'
                toggleFunc={false} />
        </div>
    )
}

export default connect((state) => ({
    goals: state.goals
}))(Goals)