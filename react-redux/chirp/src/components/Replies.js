import React from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import { formatTweet } from '../utils/helpers'

function Replies({tweets}){
    return (
        <div>
            <h1 className="title center">Replies</h1>
            <ul>
                {tweets.map((tweet) => (
                    <li key={tweet.id}>
                        <Tweet tweet={tweet}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function mapStateToProps({users, tweets, authedUser}, {parentID}){

    // transform array of reply IDs to sorted tweet objects
    const tweetArray = tweets[parentID].replies
        .map((id) => tweets[id])
        .sort((a,b) => b.timestamp - a.timestamp)                                            
                                            
    // use provided helper function to clean up the data for the UI
    const formattedTweetArray = tweetArray.map((tweet) => 
        formatTweet(tweet, users[tweet.author], authedUser, tweets[tweet.replyingTo])
    )
    
    return {
        tweets: formattedTweetArray,
    }
}

export default connect(mapStateToProps)(Replies)