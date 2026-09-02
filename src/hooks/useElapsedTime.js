import { useEffect, useState } from 'react'
import { formatElapsedTime, getElapsedSeconds } from '../utils/orderHelpers'

const OVERDUE_THRESHOLD_SECONDS = 600

export function useElapsedTime(createdAt) {
  const [state, setState] = useState(() => ({
    elapsed: formatElapsedTime(createdAt),
    isOverdue: getElapsedSeconds(createdAt) > OVERDUE_THRESHOLD_SECONDS,
  }))

  useEffect(() => {
    const tick = () => {
      const seconds = getElapsedSeconds(createdAt)
      setState({
        elapsed: formatElapsedTime(createdAt),
        isOverdue: seconds > OVERDUE_THRESHOLD_SECONDS,
      })
    }
    tick()
    const intervalId = setInterval(tick, 1000)
    return () => clearInterval(intervalId)
  }, [createdAt])

  return state
}
