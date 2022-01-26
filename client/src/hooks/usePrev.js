import { useEffect, useRef } from "react";

export const usePrev = (value) => {
    const prevValue = useRef(null)

    useEffect(() => {
        prevValue.current = value
    }, [])

    return prevValue.current
}