'use client'
import FilterListIcon from '@mui/icons-material/FilterList'
import { Alert, Box, CircularProgress, IconButton } from '@mui/material'
import { FC, useState } from 'react'
import Sidebar from '../SideBar/SideBar'
import ProductItem from './ProductItem'
import ProductSorted from './ProductSorted'
import {
	useFilteredProducts,
	useProduct,
	useSortedProducts,
} from './useProduct'

type SortType = 'name' | 'price'
type SortDirection = 'asc' | 'desc'

const ProductList: FC = () => {
	const { data, error, isLoading } = useProduct()
	const [sortType, setSortType] = useState<SortType>('name')
	const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const [minPrice, setMinPrice] = useState(0)
	const [maxPrice, setMaxPrice] = useState(10000)
	const [showOnlyNew, setShowOnlyNew] = useState(false)

	const sortedProducts = useSortedProducts(data || [], sortType, sortDirection)

	const filteredProducts = useFilteredProducts({
		maxPrice,
		minPrice,
		products: sortedProducts,
		showOnlyNew,
	})

	if (isLoading) {
		return <CircularProgress />
	}

	if (error) {
		return <Alert severity='error'>{error.message}</Alert>
	}

	if (!isLoading && (!data || data.length === 0)) {
		return <Alert severity='info'>Товары не найдены</Alert>
	}

	return (
		<Box>
			<IconButton
				onClick={() => setIsSidebarOpen(true)}
				sx={{ marginBottom: 2 }}
				style={{ color: '#fff' }}
			>
				<FilterListIcon />
			</IconButton>

			<Sidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				minPrice={minPrice}
				maxPrice={maxPrice}
				onPriceChange={(min, max) => {
					setMinPrice(min)
					setMaxPrice(max)
				}}
				showOnlyNew={showOnlyNew}
				onShowOnlyNewChange={setShowOnlyNew}
			/>

			<ProductSorted
				setSortDirection={setSortDirection}
				setSortType={setSortType}
				sortDirection={sortDirection}
				sortType={sortType}
			/>

			<Box
				sx={{
					display: 'flex',

					gridTemplateColumns: 4,
					flexWrap: 'wrap',
					gap: 2,
				}}
			>
				{filteredProducts.map(product => (
					<ProductItem key={product.id} product={product} />
				))}
			</Box>
		</Box>
	)
}
export default ProductList
