import React, { Component } from 'react'
import siteData from '../data/siteData.json'
import Device from './device'

import ProgressiveImage from 'react-progressive-image'

const path = './images/story/'

class Story extends Component {
	constructor(props) {
		super(props)

		this.state = {
			image: props.placeholder,
			loading: true,
			srcSetData: { srcSet: '', sizes: '' },
			current: 1
		}
	}

	handleClick(event) {
		// console.log('CLICK', this)
		if (this.state.current < siteData.story.images.length) {
			this.setState({
				current: this.state.current + 1
			})
		}
	}

	render() {
		const images = []
		for (var i = 0; i < this.state.current; i++) {
			const val = siteData.story.images[i]
			images.push(
				<ProgressiveImage src={path + val.mobile} placeholder={path + val.thumb} key={i}>
					{(src, loading) => {
						console.log(src, loading, i)
						return <img style={{ opacity: loading ? 0.2 : 1 }} src={src} alt={val.mobile} />
					}}
				</ProgressiveImage>
			)
		}

		// const text = siteData.story.text.map((val, i) => {
		// 	// console.log(i, val)
		// 	return val.map((obj, k) => {
		// 		return <div key={i + '-' + k}>{obj.text}</div>
		// 	})
		// })
		// console.log('text:', text)

		return (
			<div className="story" onClick={this.handleClick.bind(this)}>
				<div className="gallery">
					{images}
					{/* {text} */}
				</div>
			</div>
		)
	}
}

export default Story
