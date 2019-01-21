import FrameRateBase from './FrameRateBase'
// import 'ad-polyfills/lib/request-animation-frame'

class FrameRate {

	static _isPaused = true
	static _isActive = true
	static _sets = {}
	static _RAF = undefined
	
	/** ----------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	static register = (from, handler, fps) => {
		const F = FrameRate
		fps = fps || 30
		if (!F._sets[fps]) {
			F._sets[fps] = new FrameRateBase(fps)
		}

		var pool = F._sets[fps].pool
		for (var i = 0; i < pool.length; i++) {
			if (pool[i].from === from && pool[i].handler === handler) {
				return
			}
		}
		pool.push({
			handler: handler,
			from: from
		})
		console.log('pool is now:', pool)

		if (F._isActive) F.resume()
	}

	static unregister = (from, handler, fps) => {
		const F = FrameRate
		//var handlerString = handler.toString();

		for (var key in F._sets) {
			// if fps is provided, only look in that FrameRateBase for handlers
			if (fps && key != fps) {
				continue
			}
			// otherwise, remove all references to that handler

			var pool = F._sets[key].pool
			for (var i = 0; i < pool.length; i++) {
				//if ( h[i].toString() === handlerString ){
				if (pool[i].from === from && pool[i].handler === handler) {
					pool.splice(i, 1)
					break
				}
			}

			// removes the FrameRateBase object with no handlers
			if (pool.length == 0) {
				delete F._sets[key]
			}
		}

		if (Object.keys(F._sets).length === 0) {
			F.pause()
			F._isActive = true
		}
	}

	static pause = (...args) => {
		const F = FrameRate
		if (args.length > 0) {
			for (var i = 0; i < args.length; i++) {
				var fpsTarget = args[i]
				if (F._sets[fpsTarget]) {
					F._sets[fpsTarget]._paused = true
					F._isPaused = true
				}
			}
			for (var d in F._sets) {
				if (!F._sets[d]._paused) {
					F._isPaused = false
					break
				}
			}
		} else {
			for (var d in F._sets) F._sets[d]._paused = true
			F._isPaused = true
		}

		if (F._isPaused) {
			F._isActive = false
			window.cancelAnimationFrame(F._RAF)
		}
	}

	
	static resume = (...args) => {
		const F = FrameRate
		var _currentlyRunning = !F._isPaused
		if (args.length > 0) {
			for (var i = 0; i < args.length; i++) {
				var fpsTarget = args[i]
				if (F._sets[fpsTarget]) {
					F._sets[fpsTarget]._paused = false
					F._isPaused = false
				}
			}
		} else {
			for (var d in F._sets) F._sets[d]._paused = false
			F._isPaused = false
		}

		if (!_currentlyRunning) {
			F._isActive = true
			F._RAF = window.requestAnimationFrame(F.tick)
		}
	}

	
	static secondsAsFrames = (sec) => {
		return 1 / sec
	}

	/** ----------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	static tick = () => {
		const F = FrameRate
		//console.log( 'tick' )
		if (!F._isPaused) {
			for (var h in F._sets) {
				F._sets[h].tick()
			}

			// call tick again
			window.requestAnimationFrame(F.tick)
		}
	}
}

export default FrameRate