import React from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'

import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Leaderboard from './Leaderboard';
import Add from './Add';
import Poll from './Poll';

function App({dispatch,loading}) {

  React.useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])

  return (
    <Router>
      <React.Fragment>
        <LoadingBar />
        <div className='container'>
          <Navbar />
          { loading ? null : 
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path="/add" component={Add} />
              <Route path="/polls/:id" component={Poll} />
              <Route render={() => <div>404</div>} />
            </Switch>
          }
        </div>
      </React.Fragment>
    </Router>
  );
}

function mapStateToProps({authedUser}) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
