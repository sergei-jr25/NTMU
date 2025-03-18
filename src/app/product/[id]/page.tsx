import DetailPage from '@/components/Screens/DetailPage'
import { IProduct } from '@/type/type'
import { FC } from 'react'

type Props = {
	params: Promise<{ id: string }>
}

async function fetchProduct(): Promise<IProduct[] | null> {
	const apiUrl = process.env.API_URL as string
	try {
		const response = await fetch(apiUrl, { next: { revalidate: 60 } })
		if (!response.ok) {
			throw new Error('Ошибка загрузки данных')
		}
		const data: IProduct[] = await response.json()

		return data
	} catch (error) {
		throw new Error('Ошибка загрузки данных')
	}
}

const page: FC<Props> = async ({ params }) => {
	const resolvedParams = await params
	const products = (await fetchProduct()) || []

	const product = products.find(p => p.id === +resolvedParams.id)

	if (!product) {
		return <div>Товар не найден</div>
	}

	return <DetailPage data={product} />
}
export default page
