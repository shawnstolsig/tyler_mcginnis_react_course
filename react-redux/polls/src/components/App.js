import React from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Dashboard from './Dashboard'

function App({dispatch,loading}) {

  React.useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])

  if (loading) {
    return <div>LOADING</div>
  }
  
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route render={() => <div>404</div>} />
      </Switch>

    </Router>
  );
}

function mapStateToProps({authedUser}) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
