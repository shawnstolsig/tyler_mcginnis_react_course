import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

function LanguagesNav ({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className='flex-center'>
      {languages.map((language) => (
        <li key={language}>
          <button
            className='btn-clear nav-link'
            style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
            onClick={() => onUpdateLanguage(language)}>
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid ({ repos }) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
        const { login, avatar_url } = owner

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className='card-list'>
                <li>
                  <Tooltip text="Github username">
                    <FaUser color='rgb(255, 191, 116)' size={22} />
                    <a href={`https://github.com/${login}`}>
                      {login}
                    </a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color='rgb(255, 215, 0)' size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
}


function reducer(state, action){
  if(action.type === 'fetch'){
    return {
        ...state,
      loading: true,
      error: null,
    }
  } else if (action.type === 'success'){
    state.repos[state.selectedLanguage] = action.data

    return {
        ...state,
      loading: false,
      error: null,
    }
  } else if (action.type === 'error'){
    return {
        ...state,
      loading: false,
      error: 'Failed to retrieve data',
    }
  } else if (action.type === 'changeLanguage'){
    return {
        ...state,
      selectedLanguage: action.data
    }
  } else {
    throw new Error("Not a valid action for reducer.")
  }
}


export default function Popular(){
  const initialState = {
    selectedLanguage: 'All',
    loading: false,
    error: null,
    repos: {}
  }
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const {selectedLanguage, loading, error, repos} = state

  // update this for reducer
  const updateLanguage = (selectedLanguage) => {
    // update selectedLanguage in state
    dispatch({type: 'changeLanguage', data: selectedLanguage})

    // see if language is cached.  if not, then fetch from API
    if(!repos[selectedLanguage]){
      console.log(`${selectedLanguage} is not cached, fetching`)
      dispatch({type: 'fetch'})
  
      fetchPopularRepos(selectedLanguage)
        .then( (data) => {
          dispatch({type: 'success', data: data}) 
        })
        .catch( (err) => {
          console.warn(err)
          dispatch({type: 'error'})
        })
    } 
  }

  // useEffect for loading language.  call updateLanguage on initial render and whenever selectedLanguage changes
  React.useEffect( () => {
    updateLanguage(selectedLanguage)
  }, [selectedLanguage])



  return (
    <React.Fragment>
      <LanguagesNav
        selected={selectedLanguage}
        onUpdateLanguage={updateLanguage}
      />

      {loading && <Loading text='Fetching Repos' />}

      {error && <p className='center-text error'>{error}</p>}

      {repos && repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
    </React.Fragment>
  )

}