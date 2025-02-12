import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const EmRegister = () => {
  const [userType, setUserType] = useState('education'); // Default type
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const educationCategories = [
    'Day School', 'Play School', 'Boarding School', 'Coaching Centre', 'Private Tutor'
  ];
  const healthcareCategories = [
    'Hospital', 'Private Clinic', 'Medical Stores'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (userType !== 'education' && userType !== 'healthcare') {
      setMessage('Invalid user type selected.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8001/user/register',
        { name, email, password, phone, category, userType },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        setMessage('Registration Successful!');
      } else {
        setMessage(response.data.message || 'Registration Failed');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setMessage('Something went wrong. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative lg:mt-33 mt-25 min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/login.jpg)' }}>
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-50 p-8 rounded-lg shadow-xl z-10 w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, duration: 0.8 }}
      >
        <h2 className={`text-xl font-serif mb-4 text-center ${userType === 'education' ? 'text-[#fa7b5c]' : 'text-[#17A2B8]'}`}>
          Register
        </h2>

        {message && (
          <p className={`text-center text-xs font-medium mb-3 ${message.includes('Success') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        {/* User Type Selection */}
        <div className="mb-4 flex justify-center ">
          <button
            className={`px-4 py-1  text-xs font-medium ${userType === 'education' ? 'bg-[#E76F51] text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setUserType('education')}
          >
            Education
          </button>
          <button
            className={`px-4 py-1  text-xs font-medium ${userType === 'healthcare' ? 'bg-[#17A2B8] text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setUserType('healthcare')}
          >
            Healthcare
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            <label className="block py-2 text-xs font-bold text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-2 py-1 border rounded text-xs focus:ring-1 focus:ring-[#E76F51]"
              required
            />
          </div>
          <div>
            <label className="block py-2 text-xs font-bold text-gray-700">Mobile Number</label>
            <input
              type="text"
              value={phone}
              placeholder="Enter your mobile number"
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-2 py-1 border rounded text-xs focus:ring-1 focus:ring-[#E76F51]"
              required
            />
          </div>
          <div>
            <label className="block py-2 text-xs font-bold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-2 py-1 border rounded text-xs focus:ring-1 focus:ring-[#E76F51]"
              required
            />
          </div>
          <div>
            <label className="block py-2 text-xs font-bold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-2 py-1 border rounded text-xs focus:ring-1 focus:ring-[#E76F51]"
              required
            />
          </div>

          {/* Category Dropdown */}
          {userType && (
            <div>
              <label className="block py-2 text-xs font-bold text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2 py-1 border rounded text-xs focus:ring-1 focus:ring-[#E76F51] text-gray-700"
                required
              >
                <option value="" disabled hidden>Select Category</option>
                {userType === 'education'
                  ? educationCategories.map((item, idx) => <option key={idx} value={item}>{item}</option>)
                  : healthcareCategories.map((item, idx) => <option key={idx} value={item}>{item}</option>)
                }
              </select>
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-1 mt-10 text-white text-xs font-medium rounded ${loading ? 'bg-gray-400' : userType === 'education' ? 'bg-[#E76F51] hover:bg-[#9f6b5e]' : 'bg-[#17A2B8] hover:bg-[#6babb5]'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Registering...' : 'Register'}
          </motion.button>
        </form>

        <p className="mt-2 text-xs font-medium text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-[#E76F51] font-medium hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default EmRegister;
