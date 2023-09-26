import { type FC, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface AvatarProps {
  src: string
  alt?: string
  color?: string
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  name?: string
  cursor?:
    | 'auto'
    | 'default'
    | 'pointer'
    | 'wait'
    | 'text'
    | 'move'
    | 'help'
    | 'not-allwed'
    | 'none'
    | 'context-menu'
    | 'progress'
    | 'cell'
    | 'crosshair'
  icon?: ReactNode
  isBordered?: boolean
  isDisabled?: boolean
  isFucusable?: boolean
  showFallback?: boolean
  classNames?: Record<'base' | 'img' | 'fallback' | 'name' | 'icon', string>
}

export const Avatar: FC<AvatarProps> = ({
  src,
  alt,
  color,
  radius = 'full',
  size = 'xs',
  name = 'LR',
  icon: Icon,
  isBordered,
  isDisabled,
  cursor = 'default',
  isFucusable,
  showFallback,
  classNames,
}) => {
  const rounded = 'rounded-'.concat(radius)
  return (
    <div
      className={cn(
        'flex relative justify-center items-center box-border align-middle outline-none',
        cursor !== 'default' && `cursor-${cursor}`
      )}
    >
      <img
        src={src}
        alt=''
        aria-disabled='true'
        className={ cn(
          ["object-cover flex",
          isBordered && 'ring-2 ring-indigo-500 border-2 border-zinc-950',
          isDisabled && 'opacity-30 ',
          rounded,
          'size-'.concat(size),
          classNames?.img]
        )}
      />
    </div>
  )
}
