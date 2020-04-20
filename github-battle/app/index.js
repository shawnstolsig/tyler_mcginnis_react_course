import React from 'react'
import ReactDom from 'react-dom'

import './index.css'
import Popular from './components/popular'
import Nav from './components/Nav'
import Battle from './components/battle'
import { ThemeProvider } from './contexts/Theme'


class App extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            theme: 'light',
            // we are putting this toggleTheme method inside of state because we will need to be able to access it anywhere within the ThemeContext
            toggleTheme: () => {
                this.setState(({ theme }) => ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }
        }
    }


    render(){
        return(
            // wrapping entire app inside of ThemeProvider so that all child components will have access to theme and toggleTheme
            <ThemeProvider value={this.state}>
                <div className={this.state.theme}>
                    <div className='container'>
                        <Nav/>
                        {/* <Battle /> */}
                        <Popular />
                    </div>
                </div>
            </ThemeProvider>
        )
    }
}

ReactDom.render(
    <App />,
    document.getElementById('app')
)

