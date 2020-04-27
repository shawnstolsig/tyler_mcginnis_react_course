import React from 'react'
import { NavLink } from 'react-router-dom'

import { ThemeConsumer } from '../contexts/Theme'

const activeLinkStyle = {
    color: 'green',
}

export default function Nav(){
    return (
        <ThemeConsumer>
            {  ({theme, toggleTheme}) => (
                <div className="nav-bar">
                    <div>
                        <NavLink 
                            exact 
                            className="link" 
                            to="/" 
                            activeStyle={activeLinkStyle}
                            >Top
                        </NavLink>
                        <NavLink 
                            exact 
                            className="link" 
                            to="/new" 
                            activeStyle={activeLinkStyle}
                            >New
                        </NavLink>
                    </div>
                    <button 
                        onClick={toggleTheme}
                        className="btn-clr">
                        { theme === 'dark' ? '🌞' : '🌚' }
                    </button>
                </div>
            )}
        </ThemeConsumer>
    )
}