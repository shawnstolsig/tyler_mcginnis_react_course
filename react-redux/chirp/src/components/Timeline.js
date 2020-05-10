import React from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'

function Timeline({dispatch, users, tweets}){
    return (
        <div>
            <h3>Timeline</h3>
            <ul>
                {tweets.map((tweet) => (
                    <li key={tweet.id}>
                        <Tweet tweet={tweet} avatarURL={users[tweet.author].avatarURL}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function mapStateToProps({users, tweets}){
    // convert state's tweets object into an array, sorted by timestamp
    const tweetArray = Object.keys(tweets).map((id) => tweets[id])
                                            .sort((a,b) => b.timestamp - a.timestamp)

    return {
        tweets: tweetArray,
        users
    }
}

export default connect(mapStateToProps)(Timeline)