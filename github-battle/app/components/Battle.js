import React from 'react'

import PropTypes from 'prop-types'
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa'

// a functional component for the instructions section
function Instructions(){
    return (
        <div className="instructions-container">
            <h1 className='center-text header-lg'>
                Instructions
            </h1>
            <ol className="container-sm grid center-text battle-instructions">
                <li>
                    <h3 className="header-sm">Enter two Github Users</h3>
                    <FaUserFriends className='bg-light' color="rgb(255,191,116)" size={140} />
                </li>
                <li>
                    <h3 className="header-sm">Battle</h3>
                    <FaFighterJet className='bg-light' color="#727272" size={140} />
                </li>
                <li>
                    <h3 className="header-sm">See the winners</h3>
                    <FaTrophy className='bg-light' color="rgb(255,215,0)" size={140} />
                </li>
            </ol>
        </div>
    )
}

// our Player component
class PlayerInput extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    render(){
        return (
            <form 
                className='column player'
                onSubmit={this.handleSubmit}
            >
                <label className="player-label" htmlFor='username'>
                    {this.props.label}
                </label>
                <div className="row player-inputs">
                    {/* this will be a controlled component.  in other words, state of the input field lives in component state */}
                    <input 
                        type="text" 
                        id="username" 
                        className="input-light" 
                        placeholder="github username" 
                        autoComplete="off"
                        // this is what makes it controlled: 
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <button 
                        className="btn dark-btn" 
                        type="submit" 
                        disabled={!this.state.username}
                        >
                        Submit
                    </button>
                </div>
            </form>
        )
    }
    // this function is invoked whenever player name is submitted
    handleSubmit(event){
        // prevent normal browser events
        event.preventDefault()

        this.props.onSubmit(this.state.username)
    }
    // invoked whenever input field changes.  this allows us to use controlled (instead of uncontrolled) input fields
    handleChange(event){
        // update state, trigger re-render
        this.setState({
            username: event.target.value
        })
    }
}

// proptypes for Player
PlayerInput.proptypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
}


// our Battle component
export default class Battle extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Instructions />
                <PlayerInput label="Label!" onSubmit={(value) => console.log(value) } />
            </React.Fragment>
        )
    }
}
