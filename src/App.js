import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/header'
import Homepage from './components/pages/homepage'
import WhenWhere from './components/pages/whenwhere'
import Accomodation from './components/pages/accomodation'
import Registry from './components/pages/registry'
import InTown from './components/pages/in-town'
import Gallery from './components/pages/gallery'

import InfiniteScroll from 'react-infinite-scroller'

const items = [
	<Homepage key={0} />,
	<WhenWhere key={1} />,
	<Accomodation key={2} />,
	<Registry key={3} />,
	<InTown key={4} />,
	<Gallery key={5} />
]

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			hasMoreItems: true,
			count: 0
		}
	}

	loadItems(page) {
		var T = this

		if (T.state.count < items.length) {
			T.setState({
				count: page
			})
		} else {
			T.setState({
				hasMoreItems: false
			})
		}
	}

	render() {
		console.log('RENDER', this.state)
		const loader = (
			<div className="loader" key={'loader'}>
				Loading ...
			</div>
		)
		var selectedItems = items.slice(0, this.state.count)
		return (
			<Router>
				<div className="App">
					<Header />
					<div className="content-container">
						<InfiniteScroll
							pageStart={0}
							loadMore={this.loadItems.bind(this)}
							hasMore={this.state.hasMoreItems}
							loader={loader}
						>
							<div>{selectedItems}</div>
						</InfiniteScroll>
					</div>
				</div>
			</Router>
		)
	}
	// render() {
	// 	return (
	// 		<Router>
	// 			<div className="App">
	// 				<Header />
	// 				<div className="content-container">
	// 					<Route exact path="/" component={Homepage} />
	// 					<Route exact path="/when-where" component={WhenWhere} />
	// 					<Route exact path="/accomodation" component={Accomodation} />
	// 					<Route exact path="/registry" component={Registry} />
	// 					<Route exact path="/in-town" component={InTown} />
	// 					<Route exact path="/gallery" component={Gallery} />
	// 				</div>
	// 			</div>
	// 		</Router>
	// 	)
	// }
}

export default App
