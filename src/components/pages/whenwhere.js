import React, { Component } from 'react'

class WhenWhere extends Component {
	render() {
		return (
			<div className="home flex-base">
				<div id="header" className="flex-base">
					<h2>We're getting married!!!</h2>
					<div className="flex-base">
						<div id="location">
							<h3>Bridal Veil Lakes</h3>
							<h1>Portland, OR</h1>
						</div>
						<h2>August 3rd, 2019</h2>
					</div>
				</div>
				<img className="myImg" alt="" />
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
