import { Component } from 'react'
import ScrollWatcher from '../js/ScrollWatcher'
import GlobalManager from '../js/GlobalManager'

class Section extends Component {
	constructor(props) {
		super(props)
		// console.log(':: Section ::', props)
		if (props.scrollWatch) {
			this.scrollWatch = true
		}
		this.state = {}
	}

	static getDerivedStateFromProps(props, state) {
		GlobalManager.toggleHeader(props)
		// must return
		return null
	}

	componentDidMount(props) {
		const T = this
		// console.log(':: Section :: componentDidMount()')
		if (T.scrollWatch) {
			ScrollWatcher.register(T.scrollRef, 'sub-lock')
		}
	}
}

export default Section
