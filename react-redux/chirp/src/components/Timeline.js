import React from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import { formatTweet } from '../utils/helpers'

function Timeline({dispatch, users, tweets}){
    return (
        <div>
            <h3>Timeline</h3>
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

function mapStateToProps({users, tweets, authedUser}){
    // convert state's tweets object into an array, sorted by timestamp
    const tweetArray = Object.keys(tweets).map((id) => tweets[id])
                                            .sort((a,b) => b.timestamp - a.timestamp)
                                            
    // use provided helper function to clean up the data for the UI
    const formattedTweetArray = tweetArray.map((tweet) => 
        formatTweet(tweet, users[tweet.author], authedUser, tweets[tweet.replyingTo])
    )
    
    return {
        tweets: formattedTweetArray,
    }
}

export default connect(mapStateToProps)(Timeline)