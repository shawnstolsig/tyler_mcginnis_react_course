import React from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { handleToggleLike } from '../actions/tweets'
import { Link } from 'react-router-dom'

import { MdReply, MdFavorite, MdFavoriteBorder } from 'react-icons/md'

function Tweet({dispatch, authedUser, tweet}){

    const { 
        name, 
        id, 
        timestamp, 
        text, 
        avatar, 
        likes, 
        replies, 
        hasLiked, 
        parent 
    } = tweet

    const handleReply = () => {
        console.log("Implement reply button")
    }
    const toggleLike = () => {
        dispatch(handleToggleLike({
            id, 
            hasLiked: !hasLiked, 
            authedUser
        }))
    }

    return (
        <Link to={`tweet/${id}`}>
            <div className="tweet-container">
                <span>
                    <img src={avatar} alt={`Avatar for ${name}`} />
                </span>
                <span>
                    <h3>{name}</h3>
                    <h6>{formatDate(timestamp)}</h6>
                    {parent 
                        ? <h5>Replying to @{parent.author}</h5>
                        : '' }
                    <p>{text}</p>
                    <button className="btn" onClick={handleReply}>
                        <MdReply />{replies}
                    </button>
                    <button className="btn" onClick={toggleLike}>
                        {hasLiked 
                            ? <MdFavorite /> 
                            : <MdFavoriteBorder />} {likes}
                    </button>
                </span>
            </div>
        </Link>
    )

}

function mapStateToProps({authedUser}){
    return {
        authedUser
    }
}
export default connect(mapStateToProps)(Tweet)