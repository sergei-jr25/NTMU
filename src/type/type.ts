export interface IProduct {
	id: number
	name: string
	price: number
	brand: string
	isNew: boolean
	description: string
}
export type SortType = 'name' | 'price'
export type SortDirection = 'asc' | 'desc'
