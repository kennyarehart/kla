import React, { Component } from 'react'
import ProgressiveImage from 'react-progressive-image'
import imgPoolData from '../data/imgPoolData.json'

const path = './images/test/'

class ImgRow extends Component {
	render() {
		var images = []
		for (let i = 0; i < imgPoolData.h.length; i++) {
			const img = imgPoolData.h[i]

			let child = (
				<ProgressiveImage src={path + img.large} placeholder={path + img.thumb}>
					{(src, loading) => {
						return <img style={{ opacity: loading ? 0.4 : 1 }} src={src} alt={img.mobile} />
					}}
				</ProgressiveImage>
			)

			images.push(child)
		}

		return (
			<div className="img-row" ref={div => (this.scrollRef = div)}>
				<div className="img-row-holder">{images}</div>
			</div>
		)
	}
}

export default ImgRow
