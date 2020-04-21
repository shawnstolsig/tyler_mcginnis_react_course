import React from 'react'
import PropTypes from 'prop-types'

export default class Loading extends React.Component {
    state = {
        text: this.props.text
    }
    componentDidMount(){
        this.timer = window.setInterval(() => {
            this.setState(({text}) => ({
                text: text === `${this.props.text}...` 
                    ? this.props.text
                    : text + '.'
            }))
        }, this.props.timer)
    }
    componentWillUnmount(){
        window.clearInterval(this.timer)
    }
    render(){
        const { text } = this.state
        return (
            <div>{text}</div>
        )
    }
}
// prop types and default values
Loading.propTypes = {
    text: PropTypes.string,
    timer: PropTypes.number
}
Loading.defaultProps = {
    text: "Loading",
    timer: 300
}
