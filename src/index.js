// @flow

import { useRef, useLayoutEffect } from "react"

/**
 * This hook makes a proxy for a function.
 * It guarantees to return the same instance across multiple renders. It calls nothing if the actual handler is nullish.
 * @param f Some being recreated function to wrap.
 * @returns function.
 */
export function useHandler<Func: Function>(f: ?Func): Func {
	const ref = useRef(f)
	useLayoutEffect(() => {
		ref.current = f
	})
	const proxy = useRef(function(...args) {
		return ref.current == null ? undefined : ref.current.apply(this, args)
	})
	return (proxy.current: any)
}
