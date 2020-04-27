import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import PropTypes from 'prop-types'
import Tooltip from './Tooltip'
import queryString from 'query-string'
import { Link } from 'react-router-dom'


function ProfileList({profile}){
    return (
        <ul className="card-list">
        <li>
            <FaUser color='rgb(239,115,115)' size={22} />
            {profile.name}
        </li>
        {profile.location && (
            <li>
                <Tooltip text="User's location">
                    <FaCompass color='rgb(144,115,255)' size={22} />
                    {profile.location}
                </Tooltip>
            </li> 
        )}
        {profile.company && (
            <li>
                <Tooltip text="User's company">
                    <FaBriefcase color='#795548' size={22} />
                    {profile.company}
                </Tooltip>
            </li> 
        )}
        <li>
            <FaUsers color='rgb(129,195,245)' size={22} />
            {profile.followers.toLocaleString()} followers
        </li>
        <li>
            <FaUserFriends color='rgb(64,183,95)' size={22} />
            {profile.following.toLocaleString()} following
        </li>
    </ul>
    )
}
ProfileList.propTypes = {
    profile: PropTypes.object.isRequired
}

// This component renders the results of the battle
export default class Results extends React.Component{
    
    state  = {
        winner: null,
        loser: null,
        error: null,
        loading: true,
    }
    
    // component will mount when the 'battle' button is clicked.  this is a good place to invoke battle function to actually play the game
    componentDidMount(){
        const {playerOne, playerTwo } = queryString.parse(this.props.location.search)

        // battle!
        battle([playerOne, playerTwo])
            .then( ([winner, loser]) => {               // array destructuring...[0] is always winner, [1] is always loser
                
                // update state with winner/loser
                this.setState({
                    winner,
                    loser,
                    error: null,
                    loading: false,
                })
            })
            // our battle function is setup to throw an Error if the api returns a message.  we can catch that error here in UI layer and display something to user
            .catch( ({message}) => {

                // update state with error message
                this.setState({
                    error: message,
                    loading: false,
                })
            })
    }
    
    
    
    render(){
        const { winner, loser, error, loading } = this.state

        // just render "loading" while fetching data from github api
        if(loading){
            return (
                <Loading text="Battling"/>
            )
        }

        // render error message if we get one from github api
        if(error){
            return (
                <p className='center-text error'>{error}</p>
            )
        }

        // render results of the battle
        return  (

            // winner
            <React.Fragment>
                <div className="grid space-around container-sm"> 
                    <Card 
                        header={winner.score === loser.score ? "Tie" : "Winner"}
                        subheader={`Score: ${winner.score.toLocaleString()}`}
                        avatar={winner.profile.avatar_url}
                        href={winner.profile.html_url}
                        name={winner.profile.login}
                        >
                        <ProfileList profile={winner.profile}/>
                    </Card>

                    {/* loser */}
                    <Card
                        header={winner.score === loser.score ? "Tie" : "Loser"}
                        subheader={`Score: ${loser.score.toLocaleString()}`}
                        avatar={loser.profile.avatar_url}
                        href={loser.profile.html_url}
                        name={loser.profile.login}
                        >
                        <ProfileList profile={loser.profile}/>
                    </Card>
                
                </div>

                {/* reset button */}
                <Link 
                    className="btn dark-btn btn-space" 
                    to='/battle'
                    >Reset
                </Link>
            </React.Fragment>
        )
    }
}   
