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

    const handleReply = (e) => {
        console.log("Redirecting to detail page...")
    }
    const toggleLike = (e) => {
        e.preventDefault()
        dispatch(handleToggleLike({
            id, 
            hasLiked: !hasLiked, 
            authedUser
        }))
    }

    return (
        <Link to={`/tweet/${id}`}>
            <div className="tweet-container">
                <div>
                    <img 
                        src={avatar} 
                        alt={`Avatar for ${name}`} 
                        className="avatar"
                        />
                </div>
                <div className="tweet-contents">
                    <h1 className="heading-large">{name}</h1>
                    <h2 className="heading-medium">{formatDate(timestamp)}</h2>
                    {parent 
                        ?   <Link to={`/tweet/${parent.id}`}>
                                <h3 className="heading-small">Replying to @{parent.author}</h3>
                            </Link>
                        : '' }
                    <p>{text}</p>
                    <button className="btn-clear" onClick={handleReply}>
                        <MdReply />{replies}
                    </button>
                    <button className="btn-clear" onClick={toggleLike}>
                        {hasLiked 
                            ? <MdFavorite color="red"/> 
                            : <MdFavoriteBorder />} {likes}
                    </button>
                </div>
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