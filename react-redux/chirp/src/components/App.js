// Library imports
import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom'
import { connect } from 'react-redux'

// Component/util imports
import Navbar from './Navbar'
import Timeline from './Timeline'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import { setAuthedUser } from '../actions/authedUser'

function App({dispatch}) {

	// hard-coding authed user
	const AUTHED_USER = 'tylermcginnis'

	// when component mounts, get initial data
	React.useEffect(() => {
		dispatch(handleInitialData())
		dispatch(setAuthedUser(AUTHED_USER))

	}, [dispatch])


	return (
		<Router>
			<LoadingBar />
			<Navbar />

			<Switch>
				<Route exact path='/' component={Timeline} />
				<Route path="/new" render={() => <div>Implement new component</div>} />
				<Route render={() => <h1>404: Page not found</h1>} />
			</Switch>

		</Router>
	);
}

export default connect()(App);
