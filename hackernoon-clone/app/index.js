// index.js

// React imports
import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// App imports
import './index.css'
import Loading from './components/Loading'
import Nav from './components/Nav'
import { ThemeProvider } from './contexts/Theme'

// Dynamic imports
const Top = React.lazy( () => import('./components/Top'))
const New = React.lazy( () => import('./components/New'))



// Main App
class App extends React.Component {
    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme === 'dark' ? 'light' : 'dark'
            }))
        }
    }
    render(){
        return (

            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className="container">
                            <Nav />

                            <React.Suspense fallback={Loading}>
                                <Switch>
                                    <Route exact path="/" component={New} />
                                    <Route exact path="/top" component={Top} />
                                    <Route render={() => <h1>404</h1>} />
                                </Switch>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

// Render App to #app div in index.html
ReactDom.render(
    <App />,
    document.getElementById('app')
)