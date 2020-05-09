import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function Dashboard({dispatch, answered, unanswered, match}){

    const [ questionType, setQuestionType ] = React.useState('unanswered')
    const list = questionType === 'answered' 
                ? answered
                : unanswered

    return (
        <div>
            <div className="dashboard-toggle">
                <button
                    style={{textDecoration: questionType === 'unanswered' ? 'underline' : null}}
                    onClick={() => setQuestionType('unanswered')}
                    >Unanswered
                </button>
                <button
                    style={{textDecoration: questionType === 'answered' ? 'underline' : null}}
                    onClick={() => setQuestionType('answered')}
                    >Answered
                </button>
            </div>
            <ul className="dashboard-list">
                {list.map((poll)=>(
                    <li key={poll.id}>
                        <Link to={`polls/${poll.id}`}>{poll.question}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function mapStateToProps({authedUser, polls, users}){

    const userAnswers = users[authedUser].answers
    const answered = userAnswers.map((id) => polls[id])
        .sort((a,b) => b.timestamp-a.timestamp)
    const unanswered =  Object.keys(polls)
        .filter((id) => !userAnswers.includes(id))
        .map((id) => polls[id])
        .sort((a,b) => b.timestamp - a.timestamp)

    return {
        answered,
        unanswered
    }
}

export default connect(mapStateToProps)(Dashboard)