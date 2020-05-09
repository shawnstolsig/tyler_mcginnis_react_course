import React from 'react'
import { connect } from 'react-redux'
import { handleAddPoll } from '../actions/polls'

function Add({dispatch, history}){
    const [question, setQuestion] = React.useState('')
    const [a, setA] = React.useState('')
    const [b, setB] = React.useState('')
    const [c, setC] = React.useState('')
    const [d, setD] = React.useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(question, a, b, c, d)
        history.push('/')
        dispatch(handleAddPoll({
            question,
            a,
            b,
            c,
            d
        }))
    }

    const isDisabled = () => {
        return !(question && a && b && c && d)
    }

    return (
        <form className='add-form' onSubmit={handleSubmit}>
            <h3 style={{marginBottom: 5}}>What is your question?</h3>
            <input type="text" className="input" value={question} name="question" onChange={(e) => setQuestion(e.target.value)}></input>
            <h3>What are the options</h3>
            <label className="label" htmlFor="a">A.</label>
            <input type="text" className="input" value={a} onChange={(e) => setA(e.target.value)}></input>
            <label className="label" htmlFor="b">B.</label>
            <input type="text" className="input" value={b} onChange={(e) => setB(e.target.value)}></input>
            <label className="label" htmlFor="c">C.</label>
            <input type="text" className="input" value={c} onChange={(e) => setC(e.target.value)}></input>
            <label className="label" htmlFor="d">D.</label>
            <input type="text" className="input" value={d} onChange={(e) => setD(e.target.value)}></input>
            <button className="btn" type="submit" disabled={isDisabled()}>Submit</button>
        </form>
    )
}

function mapStateToProps(state){
    return {
        // currently doesn't need any state
    }
}

export default connect(mapStateToProps)(Add)