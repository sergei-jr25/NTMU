import { useCart } from '@/context/CartContext'
import { IProduct } from '@/type/type'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	IconButton,
	Typography,
} from '@mui/material'
import Link from 'next/link'
import { FC, useState } from 'react'
const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
	const { cart, addToCart, updateQuantity } = useCart()
	const cartItem = cart.find(item => item.id === product.id)
	const [isAdded, setIsAdded] = useState(!!cartItem)

	const handleAddToCart = () => {
		addToCart(product)
		setIsAdded(true)
	}

	const handleIncrease = () => {
		updateQuantity(product.id, (cartItem?.quantity || 0) + 1)
	}

	const handleDecrease = () => {
		if (cartItem && cartItem.quantity > 1) {
			updateQuantity(product.id, cartItem.quantity - 1)
		} else {
			setIsAdded(false)
		}
	}

	return (
		<Card
			sx={{
				width: 250,
				marginBottom: 2,
				display: 'flex',
				flexDirection: 'column',
				padding: 2,
			}}
		>
			<CardContent sx={{ flexGrow: 1, padding: 0 }}>
				<Link href={`/product/${product.id}`} passHref>
					<Typography
						variant='h6'
						gutterBottom
						component='div'
						sx={{
							cursor: 'pointer',
							transition: 'color 0.3s ease',
							'&:hover': {
								color: 'primary.main',
								textDecoration: 'underline',
							},
						}}
					>
						{product.name}
					</Typography>
				</Link>
				<Typography variant='body2' color='text.secondary'>
					{product.brand}
				</Typography>
				<Typography variant='h5' color='primary'>
					${product.price}
				</Typography>
				{product.isNew && (
					<Chip
						label='Новинка'
						color='success'
						size='small'
						sx={{ marginTop: 1 }}
					/>
				)}
			</CardContent>
			<Box sx={{ marginTop: 2 }}>
				{isAdded ? (
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<IconButton onClick={handleDecrease} size='small'>
							<RemoveIcon />
						</IconButton>
						<Typography variant='body1'>{cartItem?.quantity}</Typography>
						<IconButton onClick={handleIncrease} size='small'>
							<AddIcon />
						</IconButton>
					</Box>
				) : (
					<Button variant='contained' onClick={handleAddToCart}>
						Добавить в корзину
					</Button>
				)}
			</Box>
		</Card>
	)
}

export default ProductItem
