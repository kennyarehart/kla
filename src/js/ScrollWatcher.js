export default class ScrollWatcher {
	static _isPast = false
	static _pool = []

	/** ----------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	static register = (ref, css) => {
		const T = ScrollWatcher

		T._pool.push({
			ref: ref,
			css: css
		})
		console.log('pool is now:', T._pool)
	}

	static toggle = isPast => {
		const T = ScrollWatcher
		if (isPast !== T._isPast) {
			T._isPast = isPast

			T._pool.forEach(item => {
				if (T._isPast) {
					item.ref.classList.add(item.css)
				} else {
					item.ref.classList.remove(item.css)
				}
			})
		}
	}
}
