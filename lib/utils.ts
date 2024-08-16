import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formattedString = (value: string) => {
    const parts = value.split("-")
    const capitalized = parts.map(part => {
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    })

    return capitalized.join(" ")
}