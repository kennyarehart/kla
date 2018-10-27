import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import WhenWhere from './components/pages/whenwhere'

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<div className="content-container">
						<Route exact path="/" component={WhenWhere} />
					</div>
				</div>
			</Router>
		)
	}
}

export default App
