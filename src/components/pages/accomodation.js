import React, { Component } from 'react'
import siteData from '../../data/siteData.json'

class Accomodation extends Component {
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
			<div className="accomodations-page buffered-content">
				<h2>Accommodations</h2>
				<p className="multi max-wide">
					We've reserved group rates at the two below hotels. Just mention{' '}
					<span className="wedding-name">"Weber/Arehart Wedding"</span> when booking.
					<br />
					Both hotels are just a quick 15 min ride away from the venue and located close to each other.
					However, if you wish to book alternate accommodations in the Troutdale, Bridal Veil, Hood River or
					even Portland areas, feel free!
					<br />
					<b>NOTE:</b> The Columbia River Gorge is a <i>very</i> popular location for summer weddings and
					concertes at Edgefield just down the road. We have a certain number of rooms blocked out but beyond
					that things will book very quickly.
				</p>
				<div id="hotels-holder">
					{siteData.hotels.map((o, i) => {
						return (
							<div key={i} className="hotel-single">
								<h3>{o.name}</h3>
								<p className="hotel-chunk">
									{o.address[0]}
									<br />
									{o.address[1]}
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
		)
	}
}

export default Accomodation
