import React from 'react'
import PropTypes from 'prop-types'

// you can instantiate a styles object to keep styling self-contained within a component
const styles = {
    content: {
        fontSize: '35px',
        position: 'absolute',
        left: '0',
        right: '0',
        marginTop: '20px',
        textAlign: 'center'
    }
}

// a component that renders "Loading" "Loading." "Loading.." Loading...""
export default class Loading extends React.Component{
    state = {
        content: this.props.text
    }

    // start the intervals when Loading component mounts
    componentDidMount(){

        const { text, speed } = this.props

        // store a reference to the interval so it can be referenced later in componentWillUnmount/clearInterval
        this.interval = window.setInterval( () => {
            {this.state.content === text + '...' 
                ? this.setState({
                    content: text 
                })
                : this.setState( ({content}) => ({
                    content: content + '.'
                }))
            }
        }, speed)
    }

    // need to clear setInterval when Loading component unmounts so that there isn't still a function running on an unmounted component (memory leak)
    componentWillUnmount(){
        window.clearInterval(this.interval)
    }

    render(){
        return (
            <p style={styles.content}>
                {this.state.content}
            </p>
        )
    }
}
Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
}
Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}