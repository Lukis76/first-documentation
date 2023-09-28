import { useEffect, useState, type FC, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { PhoneCamare } from '../icons/phone-camare'

type Radius = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
type ClassNames =
	| Record<
			"base" | "img" | "fallback" | "name" | "icon" | "bordered" | "disabled",
			(string | undefined) | (string | undefined)[] | any
	  >
	| undefined;
type Color = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

interface AvatarProps {
	src?: string | undefined;
	alt?: string;
	color?: Color;
	radius?: Radius;
	size?: Size;
	defaultSrc?: string;
	name?: string;
	icon?: ReactNode;
	fallback?: ReactNode;
	isBordered?: boolean;
	isDisabled?: boolean;
	isFucusable?: boolean;
	showFallback?: boolean;
	classNames?: ClassNames;
}

interface Settings {
	base: string[] | string;
	fallback: string[] | string;
	img: Array<string> | string;
	color?: Record<Color, string>;
	radius: Record<Radius, string | string[]>;
	size: Record<Size, string | string[]>;
	bordered: string[] | string;
	disabled: string[] | string;
}

export const Avatar: FC<AvatarProps> = ({
	src = undefined,
	alt,
	color = "default",
	radius = "md",
	size = "md",
	name,
	icon,
	isBordered = false,
	isDisabled = false,
	isFucusable = false,
	showFallback = false,
	classNames,
}): JSX.Element => {
	const [img, setImg] = useState<string | undefined>(undefined);

	const avatarClassName: Settings = {
		base: [
			"flex relative justify-center items-center box-border align-middle outline-none  overflow-hidden",
			classNames?.base,
		],
		img: ["object-cover flex bg-zinc-600 border-2 border-zinc-950", classNames?.img],
		fallback: [
			"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-normal text-center text-inherit  bg-transparent",
			classNames?.fallback,
		],
		color: {
			default: "bg-zinc-700/80",
			primary: "bg-blue-600/80",
			secondary: "bg-purple-700/80",
			success: "bg-green-700/80",
			warning: "bg-yellow-600/80",
			danger: "bg-rose-600/80",
		},
		radius: {
			none: "rounded-none",
			xs: "rounded-sm",
			sm: "rounded",
			md: "rounded-md",
			lg: "rounded-lg",
			xl: "rounded-xl",
			["2xl"]: "rounded-2xl",
			["3xl"]: "rounded-2xl",
			full: "rounded-full",
		},
		size: {
			xs: "h-6 w-6",
			sm: "h-8 w-8",
			md: "h-10 w-10",
			lg: "h-12 w-12",
			xl: "h-14 w-14",
			["2xl"]: "h-16 w-16",
			["3xl"]: "h-20 w-20",
			["4xl"]: "h-24 w-24",
		},
		bordered: ["border-2 border-indigo-500 ", classNames?.bordered],
		disabled: ["opacity-30", classNames?.disabled],
	};

	const handleImageError = (event: any) => {
		setImg(undefined);
		event.target.onerror = null; // Elimina la función de error
	};

	useEffect(() => {
		if (src) {
			setImg(src);
		}
	}, [src]);

	return (
		<div
			role="img"
			className={cn(
				isBordered && avatarClassName.bordered,
				isDisabled && avatarClassName.disabled,
				avatarClassName.radius[radius],
				avatarClassName.size[size],
				color.charAt(0) === "#" && `bg-[${color}]`,
				color.charAt(0) === "b" && color,
				avatarClassName.color?.[color],
				avatarClassName.base
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
					<span aria-label={name} role="img" className={cn(avatarClassName.fallback)}>
						{!icon &&
							typeof name === "string" &&
							(name.split(" ")?.length > 1
								? name?.split(" ")[0]?.charAt(0) + name?.split(" ")[1]?.charAt(0)
								: name?.charAt(0)
							)?.toLocaleUpperCase()}
						{icon}
					</span>
				)
			)}
		</div>
	);
};
