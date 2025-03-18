'use client'

import NextNProgress from 'nextjs-progressbar'
import NProgress from 'nprogress'

import { CartProvider } from '@/context/CartContext'
import { Box, Container } from '@mui/material'
import { usePathname } from 'next/navigation'
import { FC, useEffect } from 'react'
import Header from './Header/Header'

const MyLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
	const pathname = usePathname()

	useEffect(() => {
		NProgress.start()
		const timeout = setTimeout(() => NProgress.done(), 100)

		return () => {
			return clearTimeout(timeout)
		}
	}, [pathname])
	return (
		<>
			<NextNProgress />
			<CartProvider>
				<Container maxWidth='md'>
					<Header />
					<Box mt='3'>{children}</Box>
				</Container>
			</CartProvider>
		</>
	)
}
export default MyLayout
