'use client'
import React, { createContext, useContext, useState } from 'react'

type CartItem = {
	id: number
	name: string
	price: number
	quantity: number
}

type CartContextType = {
	cart: CartItem[]
	addToCart: (product: { id: number; name: string; price: number }) => void
	removeFromCart: (id: number) => void
	updateQuantity: (id: number, quantity: number) => void
	totalItems: number
	totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cart, setCart] = useState<CartItem[]>([])

	const addToCart = (product: { id: number; name: string; price: number }) => {
		setCart(prev => {
			const existingItem = prev.find(item => item.id === product.id)
			if (existingItem) {
				return prev.map(item =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			}
			return [...prev, { ...product, quantity: 1 }]
		})
	}

	const removeFromCart = (id: number) => {
		setCart(prev => prev.filter(item => item.id !== id))
	}

	const updateQuantity = (id: number, quantity: number) => {
		setCart(prev =>
			prev.map(item => (item.id === id ? { ...item, quantity } : item))
		)
	}

	const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

	const totalPrice = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	)

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				updateQuantity,
				totalItems,
				totalPrice,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}
