import React from 'react'
import { NavLink } from 'react-router-dom'

const styles = {
    active: {
        fontWeight: 'bold',
        color: 'red'
    }
}

export default function Navbar(){
    return (
        <div>
            <NavLink to="/" activeStyle={styles.active}>Dashboard</NavLink>
            <NavLink to="/leaderboard" activeStyle={styles.active}>Leaderboard</NavLink>
            <NavLink to="/add" activeStyle={styles.active}>Add Poll</NavLink> 
        </div>
    )
}