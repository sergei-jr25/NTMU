'use client'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

const BackButton: FC = () => {
	const router = useRouter()

	const handleGoBack = () => {
		router.back()
	}
	return (
		<IconButton onClick={handleGoBack} aria-label='назад'>
			<ArrowBackIcon />
		</IconButton>
	)
}
export default BackButton
