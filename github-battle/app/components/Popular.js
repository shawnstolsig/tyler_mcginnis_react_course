import React from 'react'
import PropTypes from 'prop-types'

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
            selectedLanguage: 'All'
        }
        
        // this line ensures that whenever updateLanguage is invoked, it is invoked in the context of this constructor, where this refers to the object
        this.updateLanguage = this.updateLanguage.bind(this)
    }
    updateLanguage(selectedLanguage){

        // using setState to ensure React knows we've changed state so that it can update the DOM accordingly
        this.setState({
            // this ES6 shorthand, equivalent to selectedLanguage: selectedLanguage
            selectedLanguage
        })
    }
    render(){
        // destructuring selectedLanguage from state to make it cleaner when creating LanguagesNav component
        const { selectedLanguage } = this.state

        return (
            <React.Fragment>
                <LanguagesNav 
                    selected={selectedLanguage} 
                    onUpdateLanguage={this.updateLanguage}
                />
            </React.Fragment>
        )
    }
}