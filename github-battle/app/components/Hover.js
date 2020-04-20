import React from 'react'

// a higher order component that uses render props
export default class WithHover extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            hovering: false,
        }

        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }

    // hovering methods/logic to update state: mouseOver and mouseOut
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
        const { hovering } = this.state

        return (
            <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                {/* invokes whatever function that's between the tags of where where the Hover component is created */}
                {this.props.children(hovering)}
            </div>
        )
    }
}
