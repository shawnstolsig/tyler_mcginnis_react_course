import React from 'react'
import { connect } from 'react-redux'

function Leaderboard({dispatch, users}){

    return (
        <ul>
            {users.map((user) => (
                <li className="user" key={user.id}>
                    <img src={user.avatarURL} alt={`Avatar for ${user.name}`} />
                    <div>
                        <h1>{user.name}</h1>
                        <p>{user.polls} Polls</p>
                        <p>{user.answers} Answers</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}

function mapStateToProps(state){
    return {
        users: Object.keys(state.users)
            .map((id) => {
                const { name, avatarURL, polls, answers } = state.users[id]

                return {
                    id,
                    name,
                    avatarURL,
                    polls: polls.length,
                    answers: answers.length
                }
            })
            .sort((a,b) => b.polls + b.answers > a.polls + a.answers)
    }
}

export default connect(mapStateToProps)(Leaderboard)