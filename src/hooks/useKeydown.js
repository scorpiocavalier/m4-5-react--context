import { useEffect } from 'react'

export default (code, callback) => {

  useEffect(() => {
    const handleKeydown = event => {
      if(event.code === code)
        callback()
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  })
}