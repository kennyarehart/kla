var _kills = {}
var _eventLooping = false


function createEvent(
	name,
	mouseGlobalX,
	mouseGlobalY,
	mouseLocalX,
	mouseLocalY,
	elementX,
	elementY,
	distanceX,
	distanceY,
	velocityX,
	velocityY
) {
	var E = new CustomEvent(name)
	E.mouse = {
		global: {
			x: mouseGlobalX,
			y: mouseGlobalY
		},
		local: {
			x: mouseLocalX,
			y: mouseLocalY
		}
	}
	E.element = {
		x: elementX || 0,
		y: elementY || 0
	}
	E.distance = {
		x: distanceX || 0,
		y: distanceY || 0
	}
	E.velocity = {
		x: velocityX || 0,
		y: velocityY || 0
	}
	E.direction = {
		x: velocityX > 0 ? 'right' : velocityX < 0 ? 'left' : null,
		y: velocityY > 0 ? 'down' : velocityY < 0 ? 'up' : null
	}

	return E
}

export const Event = createEvent

function stopBubble(event) {
	if (event) {
		// For IE, it bubbles custom events
		event.stopImmediatePropagation()
		// for all other browsers that do not do that
		_kills[event.type] = true
		//console.log( '\n\tGestureEvent.stop() of type:', event.type )
	}
}


export const stop = stopBubble

function isStopped(type) {
	return _kills[type] != undefined
}

export const stopped = isStopped

// A flag for the start of the event loop through all bases
export function startPoint() {
	if (!_eventLooping) {
		// the end of event loop has been reached, so reset things
		_eventLooping = true
		_kills = {}
	}
}
// A flag to reset any bubble killing
export function endPoint() {
	_eventLooping = false
}

/**	
	@memberOf GestureEvent	
	@const {string} OVER
	@desc
		Represents a 'mouseover', fired on desktop cursor roll over
	@example
		GestureEvent.OVER
*/
export const OVER = 'mouseover'

/**	
	@memberOf GestureEvent	
	@const {string} OUT
	@desc
		Represents a 'mouseout', fired on desktop cursor roll out
	@example
		GestureEvent.OUT
*/
export const OUT = 'mouseout'

/**	
	@memberOf GestureEvent	
	@const {string} MOVE
	@desc
		Represents a 'mousemove', fired on desktop cursor move
	@example
		GestureEvent.MOVE
*/
export const MOVE = 'mousemove'

/**	
	@memberOf GestureEvent	
	@const {string} PRESS
	@desc
		Represents an 'onPress', fired on mousedown / touch start
	@example
		GestureEvent.PRESS
*/
export const PRESS = 'onPress'

/**	
	@memberOf GestureEvent	
	@const {string} RELEASE
	@desc
		Represents an 'onRelease', fired on mouseup / touch end
	@example
		GestureEvent.RELEASE
*/
export const RELEASE = 'onRelease'

/**	
	@memberOf GestureEvent	
	@const {string} CLICK
	@desc
		Represents a 'click', fired on click / touch end
	@example
		GestureEvent.CLICK
*/
export const CLICK = 'onSelect'

/**	
	@memberOf GestureEvent	
	@const {string} DRAG
	@desc
		Represents an 'onDrag', fired after an element is selected and before released. <br>
		Element data objects included: selection position, element position, velocity of move	
	@example
		GestureEvent.DRAG
*/
export const DRAG = 'onDrag'

/**	
	@memberOf GestureEvent	
	@const {string} DRAG_START
	@desc
		Represents an 'onDragStart', fired after an element is selected, when first moved and before released. <br>
		Element data objects included: selection position, element position
	@example
		Gesture.addEventListener ( myDiv, GestureEvent.DRAG_START, handleDragStart );
		//
		function handleDragStart ( event ){
			// coordinate position of mouse/touch
			console.log( event.position );

			// coordinate position of target element
			console.log( event.element );
		}
*/
export const DRAG_START = 'onDragStart'

/**	
	@memberOf GestureEvent	
	@const {string} DRAG_STOP
	@desc
		Represents an 'onDragStop', fired after an element is selected, moved, then released. <br>
		Element data objects included: selection position, velocity of last move
	@example
		Gesture.addEventListener ( myDiv, GestureEvent.DRAG_STOP, handleDragStop );
		//
		function handleDragStop ( event ){
			// coordinate position of mouse/touch
			console.log( event.position );

			// velocity, ie change in distance, of target element
			console.log( event.velocity );
		}
*/
export const DRAG_STOP = 'onDragStop'

/**	
	@memberOf GestureEvent	
	@const {string} SWIPE
	@desc
		Represents an 'onSwipe', fired just after a DRAG_STOP, but different event properties available. <br>
		Element data objects included: direction, distance, velocity
	@example
		Gesture.addEventListener ( myDiv, GestureEvent.SWIPE, handleSwipe );
		//
		function handleSwipe ( event ){
			// direction of swipe, as strings 
			console.log( event.direction );

			// distance covered from down to release
			console.log( event.distance );

			// velocity, aka speed of swipe
			console.log( event.velocity );
		}
*/
export const SWIPE = 'onSwipe'
