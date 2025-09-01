import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import api from '../services/api.js';
import NotificationMessage from '../utils/NotificationMessage.jsx';

// Function to register a user using the API
const registerUser = async (formData) => {
    return await api.post('/auth/signup', formData);
};

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('error');
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        try {
            const res = await registerUser(formData);
            
            setMessage('Registration successful! Redirecting...');
            setMessageType('success');
            
            setTimeout(() => {
                login(res.data.token);
                navigate('/home');
            }, 1500); // Give the user time to see the success message
        } catch (error) {
            setMessageType('error');
            setMessage(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            {
                message && (
                    <NotificationMessage message={message} type={messageType} onDismiss={() => setMessage(null)} />
                )
            }
            
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-all ${
                            isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
