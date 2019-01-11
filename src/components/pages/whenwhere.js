import React, { Component } from 'react'
import MapContainer from '../map-container'

class WhenWhere extends Component {
	render() {
		return (
			<div className="when-where-page">
				<div>
					<div className="buffered-content">
						<h2>WEDDING CEREMONY</h2>
						<p className="starter-info end-capped">
							August 3rd, 2019
							<br />
							<span id="loc">Bridal Veil Lakes</span>
							<br />
							<span id="addr">
								3255 NE Henderson Rd,
								<br />
								Corbett, OR 97019
							</span>
						</p>
					</div>
					<img className="bridal-img postcard" alt="bridal-veil" />

					<div className="buffered-content">
						{/* <MapContainer /> */}
						<h3>About Bridal Veil Lakes</h3>
						<p className="end-capped">
							Overlooking the Historic Columbia River Gorge, Bridal Veil Lakes is located just 30 minutes
							east of Portland, off exit 28 on I-84. Towering old growth forests surround the 3 acre
							spring fed lake. The private recreational area is filled with lush greenery and gardens,
							beautiful wildflowers and breathtaking views. The secluded location is protected from the
							east wind. Spend the day in a relaxed and enchanting atmosphere.
						</p>

						<h3>DAY OF TIMELINE</h3>
						<div className="dual-column">
							<div>
								<ul>
									<li>5:00 pm</li>
									<li>5:30 - 6:00 pm</li>
									<li>6:00 - 7:00 pm</li>
									<li>7:00 - 12:00 pm</li>
								</ul>
							</div>
							<div>
								<ul>
									<li>Guests Arrive</li>
									<li>Ceremony</li>
									<li>Cocktail Hour & Photos</li>
									<li>Reception, Dinner, & Dancing</li>
								</ul>
							</div>
						</div>
						<br />
						<p className="end-capped">
							The Ceremony will be outdoors on grass with the Reception to follow with seating & dance
							floor in open air tents.
						</p>
					</div>
				</div>
			</div>
		)
	}
}

export default WhenWhere
