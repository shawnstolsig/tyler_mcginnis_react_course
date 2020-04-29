import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
    <h1>
      Home
    </h1>
  )
  
  const WillMatch = () => <h3>Matched!</h3>
  
  // our 404 component
  const NoMatch = ({ location }) => (
    <div>
      <h3>No match for <code>{location.pathname}</code></h3>
    </div>
  )


class App extends React.Component {
    render() {
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/will-match">Will Match</Link></li>
              <li><Link to="/will-not-match">Will Not Match</Link></li>
              <li><Link to="/also/will/not/match">Also Will Not Match</Link></li>
            </ul>
      
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/will-match" component={WillMatch}/>
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      }

export default App