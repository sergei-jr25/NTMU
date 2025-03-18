'use client'

import { fetchProducts } from '@/api/fetchData'
import { IProduct, SortDirection, SortType } from '@/type/type'
import { useEffect, useMemo, useState } from 'react'

type UseFilteredProductsProps = {
	products: IProduct[]
	minPrice: number
	maxPrice: number
	showOnlyNew: boolean
}

export const useProduct = () => {
	const [data, setData] = useState<IProduct[] | null>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		setIsLoading(true)

		fetchProducts()
			.then(data => {
				setData(data)
			})
			.catch(error => {
				setError(error)
				setIsLoading(false)
			})
			.finally(() => setIsLoading(false))
	}, [])

	return { data, isLoading, error }
}

export const useSortedProducts = (
	data: IProduct[],
	sortType: SortType,
	sortDirection: SortDirection
) => {
	return useMemo(() => {
		if (!data) return []

		return [...data].sort((a, b) => {
			if (sortType === 'name') {
				return sortDirection === 'asc'
					? a.name.localeCompare(b.name)
					: b.name.localeCompare(a.name)
			} else {
				return sortDirection === 'asc' ? a.price - b.price : b.price - a.price
			}
		})
	}, [data, sortType, sortDirection])
}
export const useFilteredProducts = ({
	products,
	minPrice,
	maxPrice,
	showOnlyNew,
}: UseFilteredProductsProps) => {
	return useMemo(() => {
		return products.filter(product => {
			const isPriceInRange =
				product.price >= minPrice && product.price <= maxPrice
			const isNew = showOnlyNew ? product.isNew : true
			return isPriceInRange && isNew
		})
	}, [products, minPrice, maxPrice, showOnlyNew])
}
