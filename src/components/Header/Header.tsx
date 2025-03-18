'use client'
import { useCart } from '@/context/CartContext'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material'

const Header = () => {
	const { totalItems, totalPrice } = useCart()

	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					Магазин
				</Typography>
				<IconButton color='inherit'>
					<Badge badgeContent={totalItems} color='error'>
						<ShoppingCartIcon />
					</Badge>
				</IconButton>
				<Typography variant='body1'>${totalPrice.toFixed(2)}</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default Header
