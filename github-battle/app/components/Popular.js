import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api.js'  // using named import since no default export from api.js

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

// this is a class based component, containing state and methods
export default class Popular extends React.Component{
    constructor(props){
        // obligatory super(props) invocation
        super(props)

        // this component's state.  
        this.state = {
            selectedLanguage: 'All',
            repos: null,
            error: null
        }
        
        // this line ensures that whenever methods are invoked, they are invoked in the context of this constructor, where this refers to the object
        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }

    // invoked whenever a new language is selected from the popular languages navbar
    updateLanguage(selectedLanguage){


        // using setState to ensure React knows we've changed state so that it can update the DOM accordingly
        this.setState({
            // this ES6 shorthand, equivalent to selectedLanguage: selectedLanguage
            selectedLanguage,
            // adding these here so that we know when loading...if both repos and error are null, then we are loading
            repos: null,
            error: null
        })

        // get data from Github API
        fetchPopularRepos(selectedLanguage)
            .then((repos) => {
                // once repos obtained, update state.repos (and reset error to null)
                this.setState({
                    repos,
                    error: null
                })
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

    // an easy way to see if data is loading (which is true when both error and repos are null)
    isLoading(){
        return this.state.repos === null && this.state.error === null
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
                {this.isLoading() && <p>Loading...</p>}  {/*"Loading..." will only display if isLoading() is true*/}
                {error && {error}}
                {repos && <pre>{JSON.stringify(repos,null,2)}</pre>}
            </React.Fragment>
        )
    }
}

