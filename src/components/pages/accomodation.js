import React from 'react'
import accomodationData from '../../data/accomodationData.json'
import Section from '../Section'
// import ProgressiveImage from 'react-progressive-image'
// import ImgRow from '../img-row'

const path = './images/hotel/'

class Accomodation extends Section {
	sortRooms(pool) {
		var prices = []
		var labels = []
		pool.forEach(val => {
			prices.push(val.price)
			labels.push(val.label)
		})
		return [prices, labels]
	}
	render() {
		return (
			// <div>
			// 	<ImgRow />
			<div className="accomodations-page" ref={div => (this.scrollRef = div)}>
				<div className="buffered-content">
					<h2>Accommodations</h2>
					<p className="multi max-wide end-capped">
						We've reserved group rates at the {accomodationData.reserved[0].name}. Just mention{' '}
						<span className="wedding-name">"Weber/Arehart Wedding"</span> when booking.
						<br />
						The hotel is just a quick 15 min ride away from the venue.
						<br />
						<b>NOTE:</b> The Columbia River Gorge is a <i>very</i> popular location for summer weddings,
						camping, and concerts at Edgefield just down the road. We have a certain number of rooms blocked
						out but beyond that things will book very quickly.
					</p>
				</div>
				<div>
					<div className="hotels-holder end-capped">
						{accomodationData.reserved.map((o, i) => {
							return (
								<div key={i} className="hotel-single">
									<img src={path + o.image.large} className="large-img shadow" alt={o.image.thumb} />
									{/* Progressive Image breaks the scroll header because of thumb height. TODO - fix? */}
									{/* <ProgressiveImage src={path + o.image.large} placeholder={path + o.image.thumb}>
										{(src, loading) => {
											return <img style={{ opacity: loading ? 0.4 : 1 }} src={src} />
										}}
									</ProgressiveImage> */}
									<h3>{o.name}</h3>
									<p className="hotel-chunk">
										{o.address[0]}
										<br />
										{o.address[1]}
									</p>
									<p className="hotel-chunk">
										<a href={o.contact.url} target="_blank">
											Website
										</a>
									</p>
									<p className="hotel-chunk">
										Contact | {o.contact.name}
										<br />
										<a href="mailto:{o.contact.email}">{o.contact.email}</a>
										<br />
										{o.contact.phone}
									</p>

									<div className="dual-column">
										{this.sortRooms(o.rooms).map((val, k) => {
											return (
												<div key={k}>
													<ul>
														{val.map((str, n) => {
															return <li key={n}>{str}</li>
														})}
													</ul>
												</div>
											)
										})}
									</div>
								</div>
							)
						})}
					</div>
				</div>
				<div className="buffered-content">
					<p className="multi max-wide">
						If you wish to book alternate accommodations in the Troutdale, Bridal Veil, Hood River or even
						Portland areas, feel free! Here are a few suggestions in Troutdale:
					</p>
					<div className="hotels-holder non-reserved">
						{accomodationData.other.map((o, i) => {
							return (
								<div key={i} className="hotel-single">
									<h3>{o.name}</h3>
									<p className="hotel-chunk">
										{o.address[0]}
										<br />
										{o.address[1]}
									</p>
									<p className="hotel-chunk">
										<a href={o.contact.url} target="_blank">
											Website
										</a>
									</p>
									<p className="hotel-chunk">{o.contact.phone}</p>
								</div>
							)
						})}
					</div>
					<p className="multi max-wide end-capped">
						There are also vacation rental options on apps and websites like AirBnb and VRBO. Camping is
						also a fun option for your stay. Anywhere along the Columbia River Gorge between
						Portland/Troutdale area and Hood River area would be within 30 minutes from the venue.
						<br />
						<b>NOTE:</b> We recommend staying on the Oregon side of the river (at least night before and
						night of the wedding) so you don’t have to worry about travel time crossing the bridges to get
						to the venue. Be aware that campsites for summer weekends book up quickly!
					</p>
				</div>
			</div>
			// 	<ImgRow />
			// </div>
		)
	}
}

export default Accomodation
