import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){

    return (
        <div className="container navbar">
            <Link to="/">HOME</Link>
            <nav className="nav-links">
                <Link to="/players">PLAYERS</Link>
                <Link to="/teams">TEAMS</Link>
            </nav>
        </div>
    )
}