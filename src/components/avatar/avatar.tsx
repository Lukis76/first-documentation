import { useEffect, useState, type FC, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { PhoneCamare } from '../icons/phone-camare'

type Radius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
type ClassNames =
  | Record<'base' | 'img' | 'fallback' | 'name' | 'icon' | 'bordered' | 'disabled', (string | undefined) | (string | undefined)[] | any>
  | undefined

interface AvatarProps {
  src?: string | undefined
  alt?: string
  color?: string
  radius?: Radius
  size?: Size
  defaultSrc?: string
  name?: string
  icon?: ReactNode | JSX.Element
  fallback?: ReactNode
  isBordered?: boolean
  isDisabled?: boolean
  isFucusable?: boolean
  showFallback?: boolean
  classNames?: ClassNames
}

interface Settings {
  base: string[] | string
  fallback: string[] | string
  img: Array<string> | string
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  radius: Record<Radius, string | string[]>
  size: Record<Size, string | string[]>
  bordered: string[] | string
  disabled: string[] | string
}

export const Avatar: FC<AvatarProps> = ({
  src = undefined,
  alt,
  color,
  radius = 'md',
  size = 'md',
  name,
  icon,
  isBordered = false,
  isDisabled = false,
  isFucusable = false,
  showFallback = false,
  classNames,
}): JSX.Element => {
  const [img, setImg] = useState<string | undefined>(undefined)

  const avatarClassName: Settings = {
    base: [
      'flex relative justify-center items-center box-border align-middle outline-none bg-zinc-600 overflow-hidden',
      classNames?.base,
      color,
    ],
    img: ['object-cover flex bg-zinc-600 border-2 border-zinc-950', classNames?.img],
    fallback: [
      ' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-normal text-center text-inherit  bg-transparent',
      classNames?.fallback,
    ],
    radius: {
      none: 'rounded-none',
      xs: 'rounded-sm',
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      ['2xl']: 'rounded-2xl',
      ['3xl']: 'rounded-2xl',
      full: 'rounded-full',
    },
    size: {
      xs: 'h-6 w-6',
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-14 w-14',
      ['2xl']: 'h-16 w-16',
      ['3xl']: 'h-20 w-20',
      ['4xl']: 'h-24 w-24',
    },
    bordered: ['border-2 border-indigo-500 ', classNames?.bordered],
    disabled: ['opacity-30', classNames?.disabled],
  }

  const handleImageError = (event: any) => {
    setImg(undefined)
    event.target.onerror = null // Elimina la función de error
  }

  useEffect(() => {
    if (src) {
      setImg(src)
    }
  }, [src])

  const Icon = icon 
  return (
    <div
      role='img'
      className={cn(
        avatarClassName.base,
        avatarClassName.color,
        isBordered && avatarClassName.bordered,
        isDisabled && avatarClassName.disabled,
        avatarClassName.radius[radius],
        avatarClassName.size[size]
      )}
    >
      {!!img ? (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/role-supports-aria-props
        <img
          src={img}
          alt={alt}
          onError={handleImageError}
          aria-disabled={isDisabled}
          className={cn(avatarClassName.radius[radius], avatarClassName.img)}
        />
      ) : (
        showFallback && (
          <span aria-label={name} role='img' className={cn(avatarClassName.fallback)} >
            {!icon ?
              typeof name === 'string' &&
              (name.split(' ')?.length > 1
                ? name?.split(' ')[0]?.charAt(0) + name?.split(' ')[1]?.charAt(0)
                : name?.charAt(0)
                )?.toLocaleUpperCase()
                :
                <PhoneCamare />
            }
          </span>
        )
      )}
      {/* <span className='absolute -top-[3%] -right-[3%] z-30 w-3 h-3 bg-rose-600 rounded-full'>
        {icon !== undefined && icon}
      </span> */}
    </div>
  )
}
