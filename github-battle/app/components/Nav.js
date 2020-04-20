import React from 'react'
import { ThemeConsumer } from "../contexts/Theme"
import { NavLink } from 'react-router-dom'

const activeStyle = {
    color: 'rgb(187, 46, 31)'
}

// functional component since it will not have state, just show UI elements
export default function Nav () {
    return (
        <ThemeConsumer>
            { ({theme, toggleTheme}) => (
                <nav className="row space-between">
                    <ul className="row nav">
                        <li>
                            <NavLink 
                                to='/' 
                                exact
                                activeStyle={activeStyle}
                                className="nav-link"
                                >Popular Repos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to='/battle' 
                                activeStyle={activeStyle}
                                className="nav-link"
                                >Battle
                            </NavLink>
                        </li>
                    </ul>
                    <button
                        style={{fontSize: 30}}
                        className='btn-clear'
                        onClick={toggleTheme}
                        >
                            {theme === 'light' ? '🔦' : '💡'}
                    </button>
                </nav>
            )}
        </ThemeConsumer>
    )
}