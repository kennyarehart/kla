import React, { Component } from 'react'

class WhenWhere extends Component {
	render() {
		return (
			<div className="when-where-page">
				<div>
					<img className="bridal-img postcard" alt="bridal-veil" />
					<h2>WEDDING CEREMONY</h2>
					<p>
						August 3rd, 2019
						<br />
						Bridal Veil Lakes
						<br />
						3255 NE Henderson Rd,
						<br />
						Corbett, OR 97019
					</p>
					<h3>About Bridal Veil Lakes</h3>
					<p>
						Overlooking the Historic Columbia River Gorge, Bridal Veil Lakes is located just 30 minutes east
						of Portland, off exit 28 on I-84. Towering old growth forests surround the 3 acre spring fed
						lake. The private recreational area is filled with lush greenery and gardens, beautiful
						wildflowers and breathtaking views. The secluded location is protected from the east wind. Spend
						the day in a relaxed and enchanting atmosphere.
					</p>
					<br />
					<a>GET DIRECTIONS</a>
					<br /> <br />
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
					<p>
						The Ceremony will be outdoors on grass with the Reception to follow with seating & dance floor
						in open air tents.
					</p>
				</div>
			</div>
		)
	}
}

export default WhenWhere

/*
<div className="home">
				<h1>Portland,</h1>
				<h1>Oregon</h1>

				<h2>Saturday</h2>
				<h3>August 3rd, 2019</h3>
				<p>6:00 PM - 12:00 AM</p>

				<p>Ceremony Begins at 6 o’clock</p>
				<p>Cocktail Hour Begins at 7 o’clock</p>
				<p>Dinner & Dancing commence at 8 o’clock</p>

				<h2>Bridal Veil Lakes</h2>
				<h3>
					3225 NE Henderson Rd<br />Corbett, OR 97019
				</h3>
			</div>
*/
