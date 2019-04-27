// @flow

import { useRef } from "react"

/**
 * This hook makes a proxy for a function.
 * It guarantees to return the same instance across multiple renders.
 * @param f Some recreatable function to wrap in.
 * @returns function.
 */
export function useHandler<Func: Function>(f: Func): Func {
	const ref = useRef(f)
	ref.current = f
	const proxy = useRef(function(...args) {
		return ref.current.apply(this, args)
	})
	return (proxy.current: any)
}
