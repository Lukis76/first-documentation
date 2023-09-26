import type { FC } from 'react'
import { cn } from '../../lib/utils'



export const Chip = (props) => {
  return (
    <span className={cn('before:absolute before:translate-x-1/2 before:translate-y-1/2 top-1/2 left-1/2 before:w-5 before:h-5 bg-rose-600 rounded-full', props?.className)}>
      +2
    </span>
  )
}
