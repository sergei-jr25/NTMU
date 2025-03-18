import { IProduct } from '@/type/type'
import { Alert, Box, Card, CardContent, Typography } from '@mui/material'
import { FC } from 'react'
import BackButton from '../ui/BackButton'

const DetailPage: FC<{ data: IProduct | null }> = ({ data }) => {
	if (!data) {
		return <Alert severity='error'>Ошибка при загрузке данных</Alert>
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
			<Card sx={{ maxWidth: 500, minWidth: 250 }}>
				<CardContent>
					<Box sx={{ alignSelf: 'flex-end', background: '#fff' }}>
						<BackButton />

						<Typography variant='h4' component='h1' gutterBottom>
							{data.name}
						</Typography>
					</Box>
					<Typography variant='h6' gutterBottom>
						Цена: ${data.price}
					</Typography>
					<Typography variant='body1'>{data.description}</Typography>
				</CardContent>
			</Card>
		</Box>
	)
}
export default DetailPage
