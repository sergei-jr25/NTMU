import { SortDirection, SortType } from '@/type/type'
import { Box, Button, ButtonGroup } from '@mui/material'
import { Dispatch, FC, SetStateAction } from 'react'

const ProductSorted: FC<{
	sortType: SortType
	sortDirection: SortDirection
	setSortType: Dispatch<SetStateAction<SortType>>
	setSortDirection: Dispatch<SetStateAction<SortDirection>>
}> = ({ sortDirection, sortType, setSortType, setSortDirection }) => {
	return (
		<Box
			sx={{
				marginBottom: 5,
				display: 'flex',
				alignItems: 'center',
				gap: '15px',
				flexWrap: 'wrap',
			}}
		>
			<ButtonGroup variant='contained'>
				<Button
					onClick={() => setSortType('name')}
					color={sortType === 'name' ? 'primary' : 'secondary'}
				>
					По названию
				</Button>
				<Button
					onClick={() => setSortType('price')}
					color={sortType === 'price' ? 'primary' : 'secondary'}
				>
					По цене
				</Button>
			</ButtonGroup>

			<ButtonGroup variant='contained'>
				<Button
					onClick={() => setSortDirection('asc')}
					color={sortDirection === 'asc' ? 'primary' : 'secondary'}
				>
					По возрастанию
				</Button>
				<Button
					onClick={() => setSortDirection('desc')}
					color={sortDirection === 'desc' ? 'primary' : 'secondary'}
				>
					По убыванию
				</Button>
			</ButtonGroup>
		</Box>
	)
}
export default ProductSorted
