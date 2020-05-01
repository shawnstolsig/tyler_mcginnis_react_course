import React from 'react'
import { getTeamsArticles, getTeam, getTeamNames } from '../api'
import Loading from './Loading'
import { Link, Redirect } from 'react-router-dom'
import TeamLogo from './TeamLogo'
import slug from 'slug'

function teamPageReducer(state, action){
    if(action.type==='fetchNames'){
        return {
            loadingTeam: true,
            loadingArticles: true,
            error: null,
            team: null,
            teamNames: []
        }
    }
    else if(action.type==='fetchTeam'){
        return {
            loadingTeam: true,
            loadingArticles: true,
            error: null,
            team: null,
            articles: [],
            teamNames: action.teamNames
        }
    }
    else if (action.type==='fetchArticles'){
        return {
            loadingTeam: false,
            loadingArticles: true,
            error: null,
            team: action.team,
            articles: [],
            teamNames: state.teamNames
        }
    }
    else if (action.type==='success'){
        return {
            loadingTeam: false,
            loadingArticles: false,
            error: null,
            team: state.team,
            articles: action.articles,
            teamNames: state.teamNames
        }
    }
    else if (action.type==='error'){
        return {
            loadingTeam: false,
            loadingArticles: false,
            error: action.message,
            team: state.team,
            articles: state.articles,
            teamNames: state.teamNames
        }
    } else {
        throw new Error("Unsupported action.")
    }
}

export default function TeamPage({ match }){
    const [state, dispatch] = React.useReducer(teamPageReducer,{
        loadingTeam: true,
        loadingArticles: true,
        error: null,
        team: null,
        articles: []
    })
    const {loadingTeam, loadingArticles, team, articles, error, teamNames} = state
    const {teamName} = match.params

    React.useEffect(() => {
        getTeamNames()
        .then((names) => {
            dispatch({type: 'fetchTeam', teamNames: names})
            return getTeam(teamName)
        })
        .then( (team) => {
            dispatch({type: 'fetchArticles', team})
            return getTeamsArticles(teamName)
        })
        .then( (articles) => dispatch({type: 'success', articles}))
        .catch( (message) => dispatch({type: 'error', message}))
    },[teamName])

    if(loadingArticles || loadingTeam){
        return <Loading />
    }

    if(error){
        return <h1>{error}</h1>
    }

    if(!teamNames.includes(teamName)){
        return <Redirect to="/"/>
    }

    return (
        <div className='panel'>
            <TeamLogo id={teamName} />
            <h1 className="medium-header">{team.name}</h1>
            <h4 style={{margin: 5}}>
                <Link 
                style={{cursor: 'pointer'}}
                to={{
                    pathname: "/players",
                    search: `?teamId=${teamName}`
                }}>View Roster</Link>
            </h4>
            <ul className="championships">
                {team.championships.map((championship) => (
                    <li key={championship}>{championship}</li>
                ))}
            </ul>
            <ul className='info-list row' style={{width: '100%'}}>
                <li>Established<div>{team.established}</div></li>
                <li>Manager<div>{team.manager}</div></li>
                <li>Coach<div>{team.coach}</div></li>
                <li>Record<div>{team.wins}-{team.losses}</div></li>
            </ul>
            <h2 className="header">Articles</h2>
            <ul className="articles">
                {articles.map((art) => (
                    <li key={art.id}>
                        <Link to={`${match.url}/articles/${slug(art.title)}`}>
                            <h4 className="article-title">{art.title}</h4>
                            <div className="article-date">
                                {art.date.toLocaleDateString()}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}