import React from 'react'

import PropTypes from 'prop-types'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import Results from './Results'
import { ThemeConsumer } from '../contexts/Theme'
import { Link } from 'react-router-dom'

// a functional component for the instructions section
function Instructions(){
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <div className="instructions-container">
                    <h1 className='center-text header-lg'>
                        Instructions
                    </h1>
                    <ol className="container-sm grid center-text battle-instructions">
                        <li>
                            <h3 className="header-sm">Enter two Github Users</h3>
                            <FaUserFriends className={`bg-${theme}`} color="rgb(255,191,116)" size={140} />
                        </li>
                        <li>
                            <h3 className="header-sm">Battle</h3>
                            <FaFighterJet className={`bg-${theme}`} color="#727272" size={140} />
                        </li>
                        <li>
                            <h3 className="header-sm">See the winners</h3>
                            <FaTrophy className={`bg-${theme}`} color="rgb(255,215,0)" size={140} />
                        </li>
                    </ol>
                </div>
            )}
        </ThemeConsumer>
    )
}

// our Player component
class PlayerInput extends React.Component{
    state = {
        username: '',
    }

    render(){
        return (
            <ThemeConsumer>
                { ({theme}) => (
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
                                className={`input-${theme}`}
                                placeholder="github username" 
                                autoComplete="off"
                                // this is what makes it controlled: 
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <button 
                                className={`btn ${theme==='dark' ? 'light-btn' : 'dark-btn'}`}
                                type="submit" 
                                disabled={!this.state.username}
                                >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </ThemeConsumer>
        )
    }
    // this function is invoked whenever player name is submitted
    handleSubmit = (event) => {
        // prevent normal browser events
        event.preventDefault()

        // onSubmit is defined where it is passed into PlayerInput as an arrow function.  so this handleSubmit is simply calling that prop function
        this.props.onSubmit(this.state.username)
    }
    // invoked whenever input field changes.  this allows us to use controlled (instead of uncontrolled) input fields
    handleChange = (event) => {
        // update state, trigger re-render
        this.setState({
            username: event.target.value
        })
    }
}

// proptypes for Player
PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
}

// a functional component for showing the avatar and name of player once fetched from github
function PlayerPreview({userName, onReset, label}){

    return (
        <ThemeConsumer>
            {({theme}) => (
                <div className="column player">
                    <h3 className="player-label">{label}</h3>
                    <div className={`row bg-${theme}`}>
                        <div className="player-info">
                            <img 
                                className="avatar-small"
                                src={`https://github.com/${userName}.png?size=200`}
                                alt={`Avater for ${userName}`}
                            />
                            <a 
                                className="link"
                                href={`https://github.com/${userName}`}
                                >{userName}
                            </a>
                        </div>
                        <button 
                            className="btn-clear flex-center" 
                            onClick={onReset}
                            >
                            <FaTimesCircle color="rgb(194,57,42)" size={26} />
                        </button>
                    </div>
                </div>
            )}
        </ThemeConsumer>
    )
}

// proptypes for PlayerPreview
PlayerPreview.propTypes = {
    userName: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

// our Battle component
export default class Battle extends React.Component {
    state = {
        playerOne: null,
        playerTwo: null,
    }

    // when input field "form" is submitted, store player names in state
    handleSubmit = (id, player) => {
        this.setState({
            [id]: player
        })
    }

    // this will set player one or two to null whenever invoked.  will be invoked by the PlayerPreview X button
    handleReset = (id) => {
        this.setState({
            [id]: null
        })
    }

    render() {
        const { playerOne, playerTwo } = this.state

        // instructions, player input/preview, and battle button UI description
        return (
            <React.Fragment>
                <Instructions />
                <div className='players-container'>
                    <h1 className="center-text header-lg">
                        Players
                    </h1>
                </div>
                <div className="row space-around">
                    {playerOne === null 
                        ? <PlayerInput 
                                label="Player One"
                                onSubmit = {(player) => this.handleSubmit('playerOne', player)}
                            /> 
                        : <PlayerPreview 
                            userName={playerOne} 
                            label={'Player One'} 
                            onReset={() => this.handleReset('playerOne')}
                            />
                    }
                    {playerTwo === null  
                        ? <PlayerInput 
                            label="Player Two"
                            onSubmit = {(player) => this.handleSubmit('playerTwo', player)}
                        /> 
                        : <PlayerPreview 
                            userName={playerTwo} 
                            label={'Player Two'} 
                            onReset={() => this.handleReset('playerTwo')}
                        />
                    }
                </div>
                    {playerOne && playerTwo && (
                        <Link 
                            className="btn dark-btn btn-space"
                            // using setstate here triggers a re-render, which dumps all the other UI elements with battle=true
                            to={{
                                pathname: '/battle/results',
                                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                            }}
                            >
                            Battle
                        </Link>
                    )}

            </React.Fragment>
        )
    }
}
