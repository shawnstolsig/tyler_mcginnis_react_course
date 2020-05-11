import React from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'

function NewTweet({dispatch, authedUser, replyingTo, history, toHome}){
    const [text, setText] = React.useState('')
    const handleSubmit = () => {
        dispatch(handleAddTweet({
            text,
            author: authedUser,
            replyingTo
        }))
        setText('')
        if(toHome){
            history.push('/')
        }
    }

    return (
        <div>
            <h3>Compose new tweet</h3>
            <textarea 
                placeholder="What's happening?" 
                value={text} 
                onChange={(e) => setText(e.target.value)}
            />
            <button 
                onClick={handleSubmit}
                disabled={!text}
                >Submit
            </button>
        </div>
    )
}

function mapStateToProps({authedUser}){
    return {
        authedUser,
    }
}
export default connect(mapStateToProps)(NewTweet)