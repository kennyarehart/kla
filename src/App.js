import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/header'
import Homepage from './components/pages/homepage'
import WhenWhere from './components/pages/whenwhere'
import Registry from './components/pages/registry'
import RSVP from './components/pages/rsvp'
import InTown from './components/pages/in-town'
import Gallery from './components/pages/gallery'

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					<div className="content-container">
						<Route exact path="/" component={Homepage} />
						<Route exact path="/when-where" component={WhenWhere} />
						<Route exact path="/registry" component={Registry} />
						<Route exact path="/rsvp" component={RSVP} />
						<Route exact path="/in-town" component={InTown} />
						<Route exact path="/gallery" component={Gallery} />
					</div>
				</div>
			</Router>
		)
	}
}

export default App
