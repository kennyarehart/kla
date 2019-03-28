import React from 'react'
import inTownData from '../../data/inTownData.json'
import Section from '../Section'
import { getThumb } from '../../js/utils'

const path = './images/intown/'

export default class InTown extends Section {
	sortRooms(pool) {
		var prices = []
		var labels = []
		pool.forEach(val => {
			prices.push(val.price)
			labels.push(val.label)
		})
		return [prices, labels]
	}

	addImage(o) {
		if (o.image) {
			const thumb = getThumb(o.image)
			return <img src={path + o.image} className="large-img shadow" alt={thumb} />
		}
	}

	addDesc(o) {
		if (o.desc) {
			return <p className="buffered-content single-desc">{o.desc}</p>
		}
	}

	render() {
		return (
			<div className="accomodations-page" ref={div => (this.scrollRef = div)}>
				<div className="buffered-content">
					<h2>{inTownData.title}</h2>
					<p className="multi max-wide end-capped">{inTownData.desc}</p>
				</div>
				<div className="intown-section end-capped max-wide">
					{inTownData.list.map((o, i) => {
						return (
							<div key={i} className="intown-single">
								<h3>{o.title}</h3>
								{this.addImage(o)}
								{this.addDesc(o)}
								<div className="single-holder">
									{o.list.map((name, k) => {
										return (
											<p className="single-chunk" key={k}>
												{name}
											</p>
										)
									})}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}
