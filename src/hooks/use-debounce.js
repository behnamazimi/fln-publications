import {useEffect, useRef} from "react";

export default function useDebounce(watch, callback, delay, ignoreInit = true) {
  const initialized = useRef(false)
  const debounceInterval = useRef(null)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      if (ignoreInit) return
    }

    const clear = () => {
      clearTimeout(debounceInterval.current)
      debounceInterval.current = null
    }

    if (!delay) {
      clear()
    }

    debounceInterval.current = setTimeout(() => {
      callback?.()
    }, delay)

    return () => {
      clear()
    }
  }, [watch, delay])
}
