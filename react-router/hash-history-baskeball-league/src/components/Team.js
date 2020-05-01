import React from 'react'
import PropTypes from 'prop-types'
import { getTeam } from '../api'

export default function Team({id, children}){
    const [team, setTeam ] = React.useState(null)
    
    const fetchTeam = (id) => {
        setTeam(null)

        getTeam(id)
            .then((team) => setTeam(team))
    }


    React.useEffect(()=>{
        fetchTeam(id)
    },[id])

    return children(team)

}
Team.proptypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
}