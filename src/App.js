import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/header'
import Homepage from './components/pages/homepage'
import WhenWhere from './components/pages/whenwhere'
import Accomodation from './components/pages/accomodation'
import Registry from './components/pages/registry'
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
						<Route exact path="/accomodation" component={Accomodation} />
						<Route exact path="/registry" component={Registry} />
						<Route exact path="/in-town" component={InTown} />
						<Route exact path="/gallery" component={Gallery} />
					</div>
				</div>
			</Router>
		)
	}
}

export default App
