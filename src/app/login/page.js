'use client'

import axios from 'axios'
import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const [errors, setErrors] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const response = await axios.post(
				'https://dashboard-back-end-95dw.onrender.com/auth/login',
				formData
			)
			console.log(response.data)
		} catch (error) {
			console.error('Login error:', error)
			setErrors('Invalid email or password')
		}
	}

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 text-black'>
			<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
				<h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label className='block text-gray-700'>Email:</label>
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							required
							className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>
					<div className='mb-4 relative'>
						<label className='block text-gray-700'>Password:</label>
						<input
							type={showPassword ? 'text' : 'password'}
							name='password'
							value={formData.password}
							onChange={handleChange}
							required
							className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<button
							type='button'
							onClick={togglePasswordVisibility}
							className='absolute right-0 bottom-0 mr-2 mb-2'
						>
							{showPassword ? (
								<FiEyeOff className='mb-1' />
							) : (
								<FiEye className='mb-1' />
							)}
						</button>
					</div>
					{errors && <div className='text-red-500 mb-4'>{errors}</div>}
					<button
						type='submit'
						className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600'
					>
						Login
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login
