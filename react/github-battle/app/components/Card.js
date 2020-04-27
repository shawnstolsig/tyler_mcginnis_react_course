import React from 'react'
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../contexts/Theme'

// By deconstructuring children from the props object, we have access to whatever was typed between the opening and closing tags
export default function Card({header, subheader, avatar, href, name, children}){

    return (
        <ThemeConsumer>
            {({theme}) => (
                <div className={`card bg-${theme}`}>
                    <h4 className="header-lg center-text">
                        {header}
                    </h4>
                    <img 
                        className="avatar" 
                        src={avatar}
                        alt={`Avatar for ${name}`} 
                    />
                    {subheader && (
                        <h4 className="center-text">
                            {subheader}
                        </h4>
                    )}
                    <h2 className="center-text">
                        <a className="link" href={href}>
                            {name}
                        </a>
                    </h2>
                    {/* Contents between <Card> and </Card>: */}
                    {children}
                </div>
            )}
        </ThemeConsumer>
    )
}

Card.propTypes = {
    header: PropTypes.string.isRequired,
    subheader: PropTypes.string,
    avatar: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}