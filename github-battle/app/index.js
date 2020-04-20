import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './index.css'
import Nav from './components/Nav'
import { ThemeProvider } from './contexts/Theme'
import Loading from './components/Loading'

// Dynamic import syntax...only import modules when needed by Router
const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))


class App extends React.Component{
    state = {
        theme: 'light',
        // we are putting this toggleTheme method inside of state because we will need to be able to access it anywhere within the ThemeContext
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    }


    render(){
        return(
            // Wrapping entire app inside Router to give child components route information/context
            <Router>
                {/* wrapping entire app inside of ThemeProvider so that all child components will have access to theme and toggleTheme */}
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>

                            {/* navbar (always there) */}
                            <Nav/>

                            {/* Routes */}
                            {/* Suspense element will load fallback whenever the children take too long to load */}
                            <React.Suspense fallback={Loading}>
                                <Switch>
                                    <Route exact path="/" component={Popular} />
                                    <Route exact path="/battle" component={Battle} />
                                    <Route path="/battle/results" component={Results} />
                                    <Route render={() => <h1>404</h1>} />
                                </Switch>
                            </React.Suspense>

                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDom.render(
    <App />,
    document.getElementById('app')
)
