import { useState, useEffect } from 'react'

export default (key, value) => {
  useEffect(() => {
    localStorage.setItem(key, value)
  }, [])

  return useState(value)
}