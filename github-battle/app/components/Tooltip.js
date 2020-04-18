import React from 'react'
import PropTypes from 'prop-types'

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

// class component for tooltip.  this is a higher order component, that adds a tooltip onto the callback component
export default class Tooltip extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            hovering: false,
        }

        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }

    // hovering methods: moustOver and mouseOut
    mouseOver(){
        this.setState({
            hovering: true
        })
    }
    mouseOut(){
        this.setState({
            hovering: false
        })
    }


    render(){
        const { text, children } = this.props
        const { hovering } = this.state

        return (
            <div 
                style={styles.container}
                onMouseOver={this.mouseOver} 
                onMouseOut={this.mouseOut}>
                    { hovering && <div style={styles.tooltip}>{text}</div> }
                    {/* Must render the actual content from the lower order component, using children prop */}
                    { children }
            </div>

        )
    }
}
Tooltip.propTypes = {
    text: PropTypes.string.isRequired
}