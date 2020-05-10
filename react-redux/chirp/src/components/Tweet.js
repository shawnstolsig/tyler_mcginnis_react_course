import React from 'react'
import { connect } from 'react-redux'

import { MdReply, MdFavorite } from 'react-icons/md'

function Tweet({dispatch, tweet, avatarURL}){

    const { id, text, author, timestamp, likes, replies, replyingTo } = tweet
    const handleReply = () => {
        console.log("Implement reply button")
    }
    const handleFavorite = () => {
        console.log("Implement favorite button")
    }

    return (
        <div className="tweet-container">
            <span>
                <img src={avatarURL} alt={`Avatar for ${author}`} />
            </span>
            <span>
                <h3>{author}</h3>
                <h6>{timestamp}</h6>
                {replyingTo 
                    ? <h5>Replying to {replyingTo}</h5>
                    : '' }
                <p>{text}</p>
                <button className="btn" onClick={handleReply}><MdReply />{replies.length}</button>
                <button className="btn" onClick={handleFavorite}><MdFavorite />{likes.length}</button>
            </span>
        </div>
    )

}


export default connect()(Tweet)