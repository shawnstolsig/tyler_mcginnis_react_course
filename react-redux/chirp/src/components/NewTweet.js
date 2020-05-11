import React from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'

function NewTweet({ dispatch, authedUser, replyingTo, history, toHome }) {
    const [text, setText] = React.useState('')
    
    const handleSubmit = () => {
        dispatch(handleAddTweet({
            text,
            author: authedUser,
            replyingTo
        }))
        setText('')
        if (toHome) {
            history.push('/')
        }
    }

    return (
        <div>
            <h1 className="title center">Compose new tweet</h1>
            <div className="tweet-form">
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
        </div>
    )
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    }
}
export default connect(mapStateToProps)(NewTweet)