import { IProduct } from '@/type/type'

export async function fetchProduct(id: number): Promise<IProduct | null> {
	try {
		const response = await fetch('/data.json') // Замени на реальный путь к JSON
		if (!response.ok) {
			throw new Error('Ошибка загрузки данных')
		}
		const data: IProduct[] = await response.json()
		return data.find(product => product.id === id) || null
	} catch (error) {
		console.error('Ошибка при загрузке товара:', error)
		return null
	}
}
