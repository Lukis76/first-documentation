import type { FC, ReactNode } from 'react'
import { cn } from '../../lib/utils'
// import {Config } from 'tailwindcss/types/index'

interface BadgeProps {
  children: ReactNode
  content: ''
  variant: ''
  color: ''
  size: ''
  radius: ''
  pleacement: ''
  disableOutline: boolean
  disableAnimation: boolean
  isInvisible: boolean
  isOneChar: boolean
  isDot: boolean
  classNames: Record<'base' | 'badge', string>
}

export const Badge: FC<BadgeProps> = ({ children }) => {
  return (
    <div className={cn('relative inline-flex shrink-0')}>
      {children}
      <span
        className={cn(
          'flex z-10 flex-wrap absolute box-border rounded-full whitespace-nowrap place-content-center origin-center items-center select-none font-semibold scale-100 opacity-100 subpixel-antialiased data-[invisible=true]:scale-0 data-[invisible=true]:opacity-0 text-xs px-0 transition-transform ease-in-out duration-300 border-2 border-background bg-blue-600/80 text-primary-foreground w-5 h-5 min-w-0 min-h-0 top-[5%] right-[5%] translate-x-1/2 -translate-y-1/2 bg-lucas '
        )}
      >
        5
      </span>
    </div>
  )
}

// const test = () => {
//   return (
//     <div>
//       <Badge color='' >
//       </Badge>
//     </div>
//   )
// }
