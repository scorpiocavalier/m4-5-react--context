import { useEffect } from 'react'

export default (timestamp, cookieRate, incrementCookiesBy) => {
  useEffect(() => {
    const millisecondsElapsed = Date.now() - timestamp
    const secondsElapsed = Math.floor(millisecondsElapsed / 1000)
    const idleCookies = cookieRate * secondsElapsed
    incrementCookiesBy(idleCookies)
  }, [])
}
