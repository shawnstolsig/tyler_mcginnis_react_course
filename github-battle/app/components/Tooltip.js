import React from 'react'
import PropTypes from 'prop-types'
import withHover from './withHover'

// styles for tooltip
const styles = {
    container: {
        position: 'relative',
        display: 'flex'
    },
    tooltip: {
        boxSizing: 'border-box',
        position: 'absolute',
        width: '160px',
        bottom: '100%',
        left: '50%',
        marginLeft: '-80px',
        borderRadius: '3px',
        backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
        padding: '7px',
        marginBottom: '5px',
        color: '#fff',
        textAlign: 'center',
        fontSize: '14px',
    }
}

// a functional component, takes in the text of the tooltip and returns/describes the tooltip UI.  note that hovering logic is not contained here, but in the higher-order component withHover
function Tooltip({ text, children, hovering }){
    return (
        <div style={styles.container}>
                { hovering && <div style={styles.tooltip}>{text}</div> }
                {/* Must render the actual content from the lower order component, using children prop */}
                { children }
        </div>

    )
}
Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    hovering: PropTypes.bool.isRequired
}

// withHover will contain the hovering logic for our tooltip.  so what we are actually exporting is a call to the higher order component
export default withHover(Tooltip, 'hovering') 

