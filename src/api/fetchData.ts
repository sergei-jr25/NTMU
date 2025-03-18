// import data from '@/shared/data.json'

import { IProduct } from '@/type/type'

export const fetchProducts = async (): Promise<IProduct[]> => {
	await new Promise(resolve => setTimeout(resolve, 1000))
	try {
		const response = await fetch('/data.json')
		if (!response.ok) {
			throw new Error('Ошибка загрузки данных')
		}
		return response.json()
	} catch (error) {
		console.error('Ошибка при загрузке товара:', error)
		throw new Error('Ошибка при загрузке товара.')
	}
}
