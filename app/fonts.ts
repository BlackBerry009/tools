import localFont from 'next/font/local'
import { Indie_Flower } from 'next/font/google'

export const inter = Indie_Flower({ weight: '400', subsets: ['latin'] })
export const myFont = localFont({src: './hk.ttf'})
