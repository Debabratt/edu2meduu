import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8001/auth/register', { username, email });
            setMessage(response.data.message);
            setIsRegistered(true);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed');
        }
    };

    const handleVerify = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8001/auth/verify', { email, otp_code: otp });
            if (response.data.result[0].message === 'Email is verified') {
                window.alert('Email verification successful');
                setMessage('Email verification successful');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Verification failed');
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white shadow-lg rounded-lg p-8 w-96'>
                {!isRegistered ? (
                    <form onSubmit={handleRegister} className='space-y-4'>
                        <h2 className='text-xl font-bold text-center text-gray-700'>Register</h2>
                        <div>
                            <label className='block text-gray-600'>Username:</label>
                            <input 
                                type='text' 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                                className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div>
                            <label className='block text-gray-600'>Email:</label>
                            <input 
                                type='email' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <button 
                            type='submit' 
                            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200'>
                            Register
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerify} className='space-y-4'>
                        <h2 className='text-xl font-bold text-center text-gray-700'>Verify Email</h2>
                        <div>
                            <label className='block text-gray-600'>Email:</label>
                            <input 
                                type='email' 
                                value={email} 
                                disabled 
                                className='w-full p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed'
                            />
                        </div>
                        <div>
                            <label className='block text-gray-600'>OTP:</label>
                            <input 
                                type='text' 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)} 
                                required 
                                className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <button 
                            type='submit' 
                            className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200'>
                            Verify Email
                        </button>
                    </form>
                )}
                {message && <p className='mt-4 text-center text-red-500'>{message}</p>}
            </div>
        </div>
    );
}

export default ForgotPassword;
