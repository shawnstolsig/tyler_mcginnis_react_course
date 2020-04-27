import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Tooltip from './Tooltip'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

function ProfileList ({ profile }) {
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239, 115, 115)' size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's location">
            <FaCompass color='rgb(144, 115, 255)' size={22} />
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
        <FaUsers color='rgb(129, 195, 245)' size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color='rgb(64, 183, 95)' size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
}

function resultsReducer(state, action){
  if(action.type==='fetch'){
    return {
      winner: null,
      loser: null,
      loading: true,
      error: null
    }
  } else if (action.type==='success'){
    return {
      loading: false,
      error: null,
      winner: action.data[0],
      loser: action.data[1]
    }
  } else if (action.type==='error'){
    return {
      loading: false,
      error: action.data,
      winner: null,
      loser: null
    }
  } else {
    throw new Error("unsupported action type in reducer func")
  }
}

export default function Results({location}){
  const { playerOne, playerTwo } = queryString.parse(location.search)

   // get state from reducer
   const [state, dispatch] = React.useReducer(resultsReducer, {
    loading: true,
    winner: null,
    loser: null,
    error: null
  })

  // on intial render only, pull battle 
  React.useEffect( () => {

    dispatch({type: 'fetch'})

    battle([ playerOne, playerTwo ])
      .then((players) => {

        dispatch({type: 'success', data: players})

      }).catch(({ message }) => {
        dispatch({type: 'error', data: message})
      })
  }, [playerOne, playerTwo])

  const { winner, loser, error, loading } = state

  if(loading){
    return <Loading text='Battling' />
  } else if (error) {
    return <p className='center-text error'>{error}</p>
  }


  return (
    <React.Fragment>
      <div className='grid space-around container-sm'>
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Winner'}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ProfileList profile={winner.profile}/>
        </Card>
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Loser'}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          name={loser.profile.login}
          href={loser.profile.html_url}
        >
          <ProfileList profile={loser.profile}/>
        </Card>
      </div>
      <Link
        to='/battle'
        className='btn dark-btn btn-space'>
          Reset
      </Link>
    </React.Fragment>
  )
}
