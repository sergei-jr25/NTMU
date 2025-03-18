import {
	Box,
	Drawer,
	FormControlLabel,
	Switch,
	TextField,
	Typography,
} from '@mui/material'
import { useCallback } from 'react'

type SidebarProps = {
	isOpen: boolean
	onClose: () => void
	minPrice: number
	maxPrice: number
	onPriceChange: (min: number, max: number) => void
	showOnlyNew: boolean
	onShowOnlyNewChange: (value: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({
	isOpen,
	onClose,
	minPrice,
	maxPrice,
	onPriceChange,
	showOnlyNew,
	onShowOnlyNewChange,
}) => {
	const handlePriceChange = useCallback((value: string, isMin: boolean) => {
		const numericValue = value === '' ? 0 : Number(value.replace(/^0+/, ''))

		if (isMin) {
			onPriceChange(numericValue, maxPrice)
		} else {
			onPriceChange(minPrice, numericValue)
		}
	}, [])
	return (
		<Drawer anchor='left' open={isOpen} onClose={onClose} color='red'>
			<Box sx={{ width: 250, padding: 2 }}>
				<Typography variant='h6' sx={{ marginBottom: 2 }}>
					Фильтры
				</Typography>

				<Typography variant='subtitle1'>Цена</Typography>
				<TextField
					label='От'
					type='number'
					value={minPrice === 0 ? '' : minPrice}
					onChange={e => handlePriceChange(e.target.value, true)}
					sx={{ marginBottom: 2 }}
					fullWidth
				/>
				<TextField
					label='До'
					type='number'
					value={maxPrice === 0 ? '' : maxPrice}
					onChange={e => handlePriceChange(e.target.value, false)}
					sx={{ marginBottom: 2 }}
					fullWidth
				/>

				<FormControlLabel
					control={
						<Switch
							checked={showOnlyNew}
							onChange={e => onShowOnlyNewChange(e.target.checked)}
						/>
					}
					label='Только новинки'
				/>
			</Box>
		</Drawer>
	)
}

export default Sidebar
