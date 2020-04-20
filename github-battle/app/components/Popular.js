import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

import { fetchPopularRepos } from '../utils/api.js'  // using named import since no default export from api.js
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'


// this is a functional component...it only takes in props, and returns UI element
// note that the Popular class is still the export default for this file, so having this second class here still works from a webpack perspective
function LanguagesNav({selected, onUpdateLanguage}){
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
        <ul className="flex-center">

            {/* using .map will create a button for every element of the languages array above */}
            {languages.map( (language) => (

                // using the language itself as a key because we know there won't be any duplicates, as it's a hardcoded const
                <li key={language}>
                    <button 

                        // some basic css classes
                        className="btn-clear nav-link" 

                        // use ternary operator to assign style if language matches state's selected language
                        style = {language === selected ? { color: 'rgb(187,46,31)' } : null}
                        
                        // have to use arrow function because {onUpdateLanguage(language)} would invoke, as opposed to just saving for onClick
                        onClick={() => onUpdateLanguage(language)}>

                            {/* the text of the button */}
                            {language} 

                    </button>
                </li>
            ))}
        </ul>
    )
}

// Using prop-types package, we can ensure props are of a specific type and required, if need be.  This helps prevent bugs/issues in code.
// lowercase P here by convention
LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

// functional component for rendering grid of repos.  Note that it has no state/computation...simply taking props and rendering UI, pure function
function ReposGrid ({repos}){
    return (
        <ul className='grid space-around'>
            {repos.map( (repo, index) => {
                // deconstruct info from repo
                const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
                const { login, avatar_url } = owner

                // each return is one card
                return (
                    <li key={html_url}>
                        <Card
                            header={`#${index+1}`}
                            avatar={avatar_url}
                            href={html_url}
                            name={login}
                            >
                            <ul className="card-list">
                                <li>
                                    <Tooltip text="Github username">
                                        <FaUser color="rgb(255,191,116)" size={22}/>
                                        <a href={`https://github.com/${login}`}>
                                            {login}
                                        </a>
                                    </Tooltip>
                                </li>
                                <li>
                                    <FaStar color="rgb(255,215,0)" size={22}/>
                                    {stargazers_count.toLocaleString()} stars
                                </li>
                                <li>
                                    <FaCodeBranch color="rgb(129,195,245)" size={22}/>
                                    {forks.toLocaleString()} forks
                                </li>
                                <li>
                                    <FaExclamationTriangle color="rgb(241,138,147)" size={22}/>
                                    {open_issues.toLocaleString()} open issues
                                </li>
                            </ul>
                        </Card>
                    </li>
                )
            })}
        </ul>
    )
}
// proptypes for ReposGrid functional component
ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}
// this is a class based component, containing state and methods
export default class Popular extends React.Component{
    state = {
        selectedLanguage: 'All',
        repos: {},
        error: null, 
    }

    // invoked whenever a new language is selected from the popular languages navbar
    updateLanguage = (selectedLanguage) => {

        // using setState to ensure React knows we've changed state so that it can update the DOM accordingly
        this.setState({
            // this ES6 shorthand, equivalent to selectedLanguage: selectedLanguage
            selectedLanguage,
            // adding these here so that we know when loading...if both repos and error are null, then we are loading
            error: null
        })

        // get data from Github API, only if not in state
        if(!this.state.repos[selectedLanguage]){
            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    // once repos obtained, update state.  using functional set state because we don't want to overwrite existing data, we are updating state based on previous data
                    this.setState(({repos}) => ({           // state is automatically a parameter, so {repos} is destructuring repos out of state
                        repos: {
                            ...repos,                       // using spread operator because we want to keep all existing key/value pairs in repos
                            [selectedLanguage]: data,       // adding a new key, using [] because selectedLanguage is a variable.  data is the return from the API
                        }
                    }))
                })
                .catch( () => {
                    // dev warning
                    console.warn('Error fetching repos: ', error);
                    
                    // show error to users by updating state.error
                    this.setState({
                        error: "There was an error fetching the repositories."
                    })
                })
        }
    }

    // an easy way to see if data is loading (which is true when both error and repos[selectedLanguage] are null)
    isLoading = () => {
        const {selectedLanguage, repos, error} = this.state

        return !repos[selectedLanguage] && error == null
    }

    // for loading first language when page loads/component is mounted to DOM
    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage)
    }

    // our UI description
    render(){
        // destructuring selectedLanguage from state to make it cleaner when creating LanguagesNav component
        const { selectedLanguage, repos, error } = this.state

        return (
            <React.Fragment>
                <LanguagesNav 
                    selected={selectedLanguage} 
                    onUpdateLanguage={this.updateLanguage}
                />
                {this.isLoading() && <Loading text="Fetching Repos"/>}  {/* By using && in this way, "Loading..." will only display if isLoading() is true*/}
                {error && <p className="center-text error">{error}</p>}
                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}/>}
            </React.Fragment>
        )
    }
}

