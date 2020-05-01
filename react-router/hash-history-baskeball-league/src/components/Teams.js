import React from 'react'
import { Route, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import TeamLogo from './TeamLogo'
import Loading from './Loading'
import { getTeamNames, getTeam } from '../api'
import { parse } from 'query-string'
import slug from 'slug'
import Team from './Team'

function teamReducer(state, action){
    if(action.type==='loading'){
        return {
            teamNames: [],
            loading: true
        }
    } else if (action.type==="success"){
        return {
            loading: false,
            teamNames: action.teams
        }
    } else {
        throw new Error("action not supported")
    }
}

export default function Teams(props){
    const {location, match} = props

    const [{teamNames, loading}, dispatch] = React.useReducer(teamReducer, {
        teamNames: [],
        loading: true,
    })

    const fetchTeamNames = () => {
        dispatch({type: 'loading'})
        getTeamNames()
            .then((teams) => dispatch({type: 'success', teams}))
    }

    React.useEffect(()=> {
        location.search 
            ? fetchTeamNames(parse(location.search).teamId)
            : fetchTeamNames()
    },[location])

    return (
        <div className="container two-column">
            <Sidebar
                loading={loading}
                title="Teams"
                list={teamNames.map((team) => team)}
                {...props}
            />

            {!loading && location.pathname === '/teams'
                ? <div className='sidebar-instruction'>Select a Team</div>
                : null }

            <Route 
                path={`${match.url}/:teamId`}
                render={({ match }) => 

                    <div className="panel">
                        {/* this is a render prop...convert to custom hook? */}
                        <Team id={match.params.teamId}>
                            {(team) => team === null
                                ? <Loading />
                                : <div style={{width: '100%'}}>
                                    <TeamLogo id={team.id} className="center" />
                                    <h1 className="medium-header">{team.name}</h1>
                                    <ul className="info-list row">
                                        <li>Established: <div>{team.established}</div></li>
                                        <li>Manager: <div>{team.manager}</div></li>
                                        <li>Coach: <div>{team.coach}</div></li>
                                    </ul>
                                    <Link
                                        className="center btn-main"
                                        to={`/${team.name}`}
                                        >
                                        {team.name} Team Page
                                    </Link>
                                  </div>
                            }
                        </Team>
                    </div>

                }
            />
        </div>
    )
}