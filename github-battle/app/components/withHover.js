import React from 'react'

// a higher order component.  takes in a component and returns it with a 'hovering' prop added, true/false if the component is being hovered over
export default function withHover(Component, propName = "hovering"){
    return class WithHover extends React.Component {
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

            // to handle the propName input, we can create an object here using ES6 computed properies, including the original Component props
            const props = {
                [propName]: hovering,
                ...this.props
            }

            return (
                <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                    {/* Must return original component, with hovering prop added.  Use spread operator to ensure all props (new and old) are passed through  */}
                    <Component {...props} />
                </div>
            )
        }
    }
}