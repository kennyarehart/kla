import Device from './fat/lib/Device'
export default class GlobalManager {
	static _isHome = null
	static _callback = null
	static _homeRef = null

	/** ----------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	static registerHeader = (scope, cb) => {
		const T = GlobalManager
		// console.log(':: GlobalManager :: registerHeader()')
		T._callback = cb
		T._homeRef = scope
	}

	static toggleHeader = props => {
		const T = GlobalManager
		// console.log('GlobalManager.toggle()')
		if (Device.type !== 'mobile') {
			var isHome = props.location.pathname === '/'
			if (isHome !== T._isHome) {
				// HACK to get the ref there post render
				requestAnimationFrame(() => {
					T._isHome = isHome
					T._callback.call(T._homeRef, isHome)
				})
			}
		}
	}
}
