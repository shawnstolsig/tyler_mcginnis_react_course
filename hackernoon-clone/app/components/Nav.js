import React from 'react'
import { NavLink } from 'react-router-dom'

import { ThemeConsumer } from '../contexts/Theme'

const activeLinkStyle = {
    color: 'red',
}

export default function Nav(){
    return (
        <ThemeConsumer>
            {  ({theme, toggleTheme}) => (
                <div className="nav-bar">
                    <div>
                        <NavLink exact className="link" to="/" activeStyle={activeLinkStyle}>New</NavLink>
                        <NavLink exact className="link" to="/top" activeStyle={activeLinkStyle}>Top</NavLink>
                    </div>
                    <button onClick={toggleTheme}>
                        Theme
                    </button>
                </div>
            )}
        </ThemeConsumer>
    )
}