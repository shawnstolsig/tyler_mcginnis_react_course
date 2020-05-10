import React from 'react'
import { NavLink } from 'react-router-dom'

const styles = {
    active: {
        color: 'red',
        fontWeight: 'bold'
    }
}

export default function Navbar(){
    return (
        <div className='navbar'>
            <ul>
                <li>
                    <NavLink exact to="/" activeStyle={styles.active}>Home</NavLink>
                </li>
                <li>
                    <NavLink exact to="/new" activeStyle={styles.active}>New Tweet</NavLink> 
                </li>
            </ul>
        </div>
    )   
}