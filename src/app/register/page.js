'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

function Register() {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		description: '',
		password: '',
		confirmPassword: '',
	})

	const [errors, setErrors] = useState({})
	const [showPassword, setShowPassword] = useState(false)
	const router = useRouter()

	const validate = () => {
		const errors = {}

		return errors
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const validationErrors = validate()
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}

		if (formData.password !== formData.confirmPassword) {
			setErrors({ confirmPassword: "Passwords don't match" })
			return
		}

		try {
			const response = await axios.post(
				'http://localhost:8000/auth/register',
				formData
			)

			localStorage.set('token', response.data.token, { expires: 30 })

			// console.log(Cookies.get('token'))
			router.push('/bands')
		} catch (error) {
			console.error('Registration error:', error)
		}
	}

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className='w-screen min-h-screen flex items-center justify-center bg-gray-100 text-black'>
			<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
				<h1 className='text-2xl font-bold mb-6 text-center'>Sign Up</h1>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label className='block text-gray-700'>First Name:</label>
						<input
							type='text'
							name='firstName'
							value={formData.firstName}
							onChange={handleChange}
							required
							minLength='2'
							className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						{errors.firstName && (
							<span className='text-red-500 text-sm'>{errors.firstName}</span>
						)}
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Last Name:</label>
						<input
							type='text'
							name='lastName'
							value={formData.lastName}
							onChange={handleChange}
							required
							minLength='2'
							className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						{errors.lastName && (
							<span className='text-red-500 text-sm'>{errors.lastName}</span>
						)}
					</div>
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
						{errors.email && (
							<span className='text-red-500 text-sm'>{errors.email}</span>
						)}
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Phone:</label>
						<input
							type='tel'
							name='phone'
							value={formData.phone}
							onChange={handleChange}
							required
							pattern='\+38\d{3}\d{7}'
							className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						{errors.phone && (
							<span className='text-red-500 text-sm'>{errors.phone}</span>
						)}
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Short Description:</label>
						<textarea
							name='description'
							value={formData.description}
							onChange={handleChange}
							required
							minLength='10'
							className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						{errors.description && (
							<span className='text-red-500 text-sm'>{errors.description}</span>
						)}
					</div>
					<div className='mb-6 relative'>
						<label className='block text-gray-700'>Password:</label>
						<input
							type={showPassword ? 'text' : 'password'}
							name='password'
							value={formData.password}
							onChange={handleChange}
							required
							pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$'
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
						{errors.password && (
							<span className='text-red-500 text-sm'>{errors.password}</span>
						)}
					</div>
					<div className='mb-4 relative'>
						<label className='block text-gray-700'>Confirm Password:</label>
						<input
							type={showPassword ? 'text' : 'password'}
							name='confirmPassword'
							value={formData.confirmPassword}
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
						{errors.confirmPassword && (
							<span className='text-red-500 text-sm'>
								{errors.confirmPassword}
							</span>
						)}
					</div>
					<button
						type='submit'
						className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600'
					>
						Register
					</button>
				</form>
			</div>
		</div>
	)
}

export default Register
