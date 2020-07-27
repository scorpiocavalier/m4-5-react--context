import { useEffect } from 'react'

export default (title, fallbackTitle) => {

  useEffect(() => {
    document.title = title
    return () => document.title = fallbackTitle
  }, [title, fallbackTitle])
}