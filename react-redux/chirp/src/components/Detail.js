import React from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import NewTweet from './NewTweet'
import Replies from './Replies'
import { formatTweet } from '../utils/helpers'

function Detail({tweet, match}){

    return (
        <div>
            <Tweet tweet={tweet} />
            <NewTweet replyingTo={tweet.id} toHome={false}/>
            {tweet.replies>0 && <Replies parentID={tweet.id} />}
        </div>
    )

}

function mapStateToProps({tweets, users, authedUser}, {match}){

    const urlParamTweet = tweets[match.params.id]

    const formattedTweet = formatTweet(
            urlParamTweet,
            users[urlParamTweet.author], 
            authedUser, 
            tweets[urlParamTweet.replyingTo])

    return {
        tweet: formattedTweet
    }
}

export default connect(mapStateToProps)(Detail)