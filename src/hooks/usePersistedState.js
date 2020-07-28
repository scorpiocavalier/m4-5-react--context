import { useState, useEffect } from 'react'

export default (key, initialState) => {
  // Get previous state from local storage
  const previousState = JSON.parse(localStorage.getItem(key))

  // Use previous state if it exists
  initialState = previousState ? previousState : initialState

  // Create a new state and setState with the right initialState
  const [currentState, setState] = useState(initialState)

  // Set the local storage state once and whenever it changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(currentState))
  }, [currentState])

  return [currentState, setState]
}