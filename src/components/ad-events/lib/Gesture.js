import GestureBase from './GestureBase'
import * as GestureEvent from './GestureEvent'
// import { Styles } from 'ad-view'

var Gesture = new function() {
	var G = this

	var _targets = []
	var _disableList = []
	var _eventPass = document.createEventObject != undefined
	var _eventLooping = false

	G._kills = {}

	/* ------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	G.add = G.addEventListener = function(target, name, handler) {
		var _gestureBase = getGestureBase(target)
		_gestureBase.register(name, handler)
		// Styles.setCss(target, 'cursor', 'pointer')

		// OVERWRITES mouseChildren(false) of parent
		// Styles.setCss(target, 'pointer-events', 'auto')
	}
	
	G.remove = G.removeEventListener = function(target, name, handler) {
		var _gestureBase = getGestureBase(target)
		if (_gestureBase) {
			_gestureBase.unregister(name, handler)
			if (_gestureBase.eventList.length <= 0) {
				// Styles.setCss(target, 'cursor', 'auto')
			}
		}
	}

	G.disable = function(target) {
		var gestureBase = getGestureBase(target)
		_disableList.push(gestureBase)

		if (_eventPass) {
			gestureBase.register(GestureEvent.CLICK, handlePassThroughClick)
			// Styles.setCss(target, 'cursor', 'auto')
		} else {
			// Styles.setCss(target, 'pointer-events', 'none')
		}
	}

	G.disableChildren = function(target) {
		setActiveChildren(target, false)
	}


	G.enable = function(target) {
		var gestureBase = getGestureBase(target)

		for (var i = 0; i < _disableList.length; i++) {
			if (gestureBase == _disableList[i]) {
				if (_eventPass) {
					gestureBase.unregister(GestureEvent.CLICK, handlePassThroughClick)
				} else {
					// Styles.setCss(target, 'pointer-events', 'auto')
					// Styles.setCss(target, 'cursor', 'pointer')
				}
				break
			}
		}
	}


	G.enableChildren = function(target) {
		setActiveChildren(target, true)
	}

	/* ------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function getGestureBase(target) {
		var _gestureBase = null
		for (var i = 0; i < _targets.length; i++) {
			if (_targets[i].elem === target) {
				_gestureBase = _targets[i]
				break
			}
		}
		if (!_gestureBase) {
			_gestureBase = createGestureBase(target)
		}
		return _gestureBase
	}

	function createGestureBase(target) {
		var _gestureBase = new GestureBase(target)
		_targets.push(_gestureBase)
		return _gestureBase
	}

	function setActiveChildren(target, active) {
		var gestureBase = getGestureBase(target)
		if (gestureBase.hasActiveChildren != active) {
			gestureBase.hasActiveChildren = active
			var children = gestureBase.elem.getElementsByTagName('*')
			for (var i = 0; i < children.length; i++) {
				//console.log( typeof children[i], ' ; ', children[i].id )
				// gets only the children, not grand-children
				if (children[i].parentNode == target) {
					active ? G.enable(children[i]) : G.disable(children[i])
				}
			}
		}
	}

	function getNextLayerElement(target, x, y, list) {
		target.style.visibility = 'hidden'
		list.push(target)

		var elem = document.elementFromPoint(x, y)
		//console.log( 'elementFromPoint() : ', elem.id );

		for (var i = 0; i < _disableList.length; i++) {
			//console.log( ' => disable list: ', i, ' : ', _disableList[i].elem.id )
			if (_disableList[i].elem == elem) {
				//console.log( '  -^ match so go again')
				return getNextLayerElement(elem, x, y, list)
			}
		}

		return elem
	}

	function getForwardedTarget(event) {
		var hiddenList = []

		var el = getNextLayerElement(event.target, event.clientX, event.clientY, hiddenList)
		//console.log( ' returned element: (', event.clientX, ', ', event.clientY, ') ', el.id )

		//console.log( 'hidden list:')
		for (var i = 0; i < hiddenList.length; i++) {
			//console.log( '  -> ', i, ' ', hiddenList[i].id )
			hiddenList[i].style.visibility = 'visible'
		}
		hiddenList = []

		event.stopImmediatePropagation()
		//console.log( ' - STOP - ')

		return el
	}

	/* ------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS

	// IE 9 & 10 needs to have events captured and passed to the next layer dom element
	function handlePassThroughClick(event) {
		//console.log( 'pass through:', event )
		var el = getForwardedTarget(event)

		// IE 9+
		var evt = document.createEvent('HTMLEvents')
		evt.initEvent(event.type, true, false)
		//console.log( '     # ', el.id, ' is dispatching ' )
		el.dispatchEvent(evt)
	}
}()

export default Gesture
