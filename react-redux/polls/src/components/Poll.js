import React from 'react'
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/answers'
import { getPercentage } from '../utils/helpers'

const getVoteKeys = () => ['aVotes', 'bVotes', 'cVotes', 'dVotes']


function Poll({dispatch, poll, vote, authedUser, authorAvatar}){
    let justAnswered = false

    const handleAnswer = (answer) => {
        justAnswered = true
        dispatch(handleAddAnswer({
            authedUser,
            answer, 
            id: poll.id
        }))
    }

    if(!poll){
        return <p>This poll does not exist.</p>
    }

    const totalVotes = getVoteKeys().reduce((total, key) => total + poll[key].length, 0)

    return (
        <div className="poll-container">
            <h1 className="question">{poll.question}</h1>
            <div className="poll-author">
                by <img src={authorAvatar} alt={`Author's avatar`} />
            </div>
            <ul>
                {['aText', 'bText', 'cText', 'dText'].map((key) => {
                    const count = poll[key[0] + 'Votes'].length
                    return (
                        <li 
                            key={key}
                            className={`option ${vote === key[0] ? 'chosen' : ''}`} 
                            onClick={() => {
                                if(vote===null && !justAnswered){
                                    handleAnswer(key[0])
                                }
                            }}>
                            {vote === null 
                                ? poll[key] 
                                : <div className='result'>
                                        <span>{poll[key]}</span>
                                        <span>{getPercentage(count, totalVotes)}%({count})</span>
                                  </div>}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

// second argument ot mapStateToProps is the current props of the component
function mapStateToProps({ authedUser, users, polls }, { match }){
    const { id } = match.params
    const poll = polls[id]

    if(!poll){
        return {
            poll: null
        }
    }

    const vote = getVoteKeys().reduce((vote,key) => {
        if(vote){
            return vote[0]
        }
        return poll[key].includes(authedUser)
            ? key
            : vote
    }, null)

    return {
        poll,
        vote,
        authedUser,
        authorAvatar: users[poll.author].avatarURL,

    }
}
export default connect(mapStateToProps)(Poll)