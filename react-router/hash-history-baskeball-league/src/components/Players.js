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
        </div>
    )
}