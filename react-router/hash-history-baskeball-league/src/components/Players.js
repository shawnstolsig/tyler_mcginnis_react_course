import React from 'react'
import { Route, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { getPlayers } from '../api'
import { parse } from 'query-string'
import slug from 'slug'

function playerReducer(state, action){
    if(action.type==='loading'){
        return {
            players: [],
            loading: true
        }
    } else if (action.type==="success"){
        return {
            loading: false,
            players: action.players
        }
    } else {
        throw new Error("action not supported")
    }
}

export default function Players(props){
    const {location, match} = props

    const [{players, loading}, dispatch] = React.useReducer(playerReducer, {
        players: [],
        loading: true,
    })

    const fetchPlayers = (teamId) => {
        dispatch({type: 'loading'})
        getPlayers(teamId)
            .then((players) => dispatch({type: 'success', players}))
    }

    React.useEffect(()=> {
        location.search 
            ? fetchPlayers(parse(location.search).teamId)
            : fetchPlayers()
    },[location])

    return (
        <div className="container two-column">
            <Sidebar
                loading={loading}
                title="Players"
                list={players.map((player) => player.name)}
                {...props}
            />

            {!loading && location.pathname === '/players'
                ? <div className='sidebar-instruction'>Select a Player</div>
                : null }

            <Route 
                path={`${match.url}/:playerId`}
                render={({match})=>{
                    if(loading) return null

                    const { 
                        name, position, teamId, number, avatar, apg, ppg, rpg, spg
                    } = players.find((player) => slug(player.name) === match.params.playerId)
                    
                    return (
                        <div className="panel">
                            <img className='avatar' src={`${avatar}`} alt={`Avatar for ${name}`} />
                            <h1 className='medium-header'>{name}</h1>
                            <h3 className='header'>#{number}</h3>
                            <div className="row">
                                <ul className='info-list' style={{marginRight: 80}}>
                                    <li>
                                        Team 
                                        <div>
                                            <Link style={{color: '#68809a'}} to={`/${teamId}`}>{teamId[0].toUpperCase() + teamId.slice(1)}</Link>
                                        </div>
                                    </li>
                                    <li>Position<div>{position}</div></li>
                                    <li>PPG<div>{ppg}</div></li>
                                </ul>
                                <ul className="info-list">
                                    <li>APG<div>{apg}</div></li>
                                    <li>SPG<div>{spg}</div></li>
                                    <li>RPG<div>{rpg}</div></li>
                                </ul>
                            </div>
                        </div>

                    )
                }}
            />
        </div>
    )
}