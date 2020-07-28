import { useEffect } from 'react'

export const getLocalValue = key => localStorage.getItem(key)

export default (key, value) => {
  useEffect(() => {
    localStorage.setItem(key, value)
  }, [value])
}
