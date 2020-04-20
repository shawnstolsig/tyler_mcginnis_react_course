import React from 'react'
import { ThemeConsumer } from "../contexts/Theme"

// functional component since it will not have state, just show UI elements
export default function Nav () {
    return (
        <ThemeConsumer>
            { ({theme, toggleTheme}) => (
                <nav className="row space-between">
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