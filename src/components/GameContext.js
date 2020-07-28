import React, { createContext } from 'react'
import usePersistedState from '../hooks/usePersistedState'
import {
  items,
  initialTimestamp,
  initialCookies,
  initialRate,
  initialItems
} from '../data'

export const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = usePersistedState('num-cookies', initialCookies)
  const [purchasedItems, setPurchasedItems] = usePersistedState('purchased-items', initialItems)
  const [cookieRate, setCookieRate] = usePersistedState('cookieRate', initialRate)
  const [timestamp, setTimestamp] = usePersistedState('time-stamp', initialTimestamp)

  const incrementCookiesBy = (amount = 1) => setNumCookies(numCookies + amount)

  const handleAttemptedPurchase = ({ id, cost }) => {
    if (numCookies >= cost) {                             // 1. can u purchase?
      incrementCookiesBy(-cost)                           // 2.1 Yes => Deduct cookies.
      setPurchasedItems(prevValue => {                    // 2.2 Yes => Increment item count in purchasedItems.
        return { ...prevValue, [id]: prevValue[id] + 1 }
      })
    } else {                                              // 3. No => Return an error with window.alert
      window.alert("Not enough cookies.")
    }
  }

  const calculateCookieRate = purchasedItems => {
    const reducer = (acc, itemId) => {
      const numOwned = purchasedItems[itemId]
      const item = items.find(item => item.id === itemId)
      const value = item.value
      return acc + value * numOwned
    }
    return Object.keys(purchasedItems).reduce(reducer, 0)
  }

  return (
    <GameContext.Provider
      value={{
        numCookies, purchasedItems, cookieRate, timestamp,
        setNumCookies, setPurchasedItems, setCookieRate, setTimestamp,
        incrementCookiesBy, handleAttemptedPurchase, calculateCookieRate
      }}
    >
      {children}
    </GameContext.Provider>
  )
}