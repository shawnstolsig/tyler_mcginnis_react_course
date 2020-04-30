import React from 'react'
import PropTypes from 'prop-types'

export default function Loading({ text='Loading' }){
    const [displayText, setDisplayText] = React.useState(text)

    React.useEffect( () => {

        const id = window.setInterval( () => {
            setDisplayText( (displayText) => displayText === `${text}...`
                ? text
                : `${displayText}.`)
        }, 300)

        return () => window.clearInterval(id)

    }, [displayText, text])

    return (
        <div className='container'>
            <p className='text-center'>
                {displayText}
            </p>
        </div>
    )
}

Loading.propTypes = {
    text: PropTypes.string
}