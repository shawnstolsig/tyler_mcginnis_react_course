import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar(){
    return (
        <nav className="nav">
            <ul>
                <li>
                    <NavLink exact to="/" activeClassName='active'>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/leaderboard" activeClassName='active'>Leaderboard</NavLink>
                </li>
                <li>
                    <NavLink to="/add" activeClassName='active'>Add Poll</NavLink> 
                </li>
            </ul>
        </nav>
    )
}