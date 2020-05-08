import React from 'react';
import Todos from './Todos'
import Goals from './Goals'
import { connect } from 'react-redux'
import {
	handleReceiveData
} from '../actions/shared'

// main app
function App({loading, dispatch}) {

	// load initial data on first render
	React.useEffect(() => {
		dispatch(handleReceiveData())
	}, [dispatch])

	if (loading) {
		return <div>LOADING</div>
	}
	return (
		<div>
			<Todos />
			<Goals />
		</div>
	)
}

export default connect((state) => ({
	loading: state.loading
}))(App)
