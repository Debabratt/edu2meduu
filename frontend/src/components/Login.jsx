import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("education");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegisterNavigate = () => {
    navigate("/register");
  };

  const handleForgotPasswordNavigate = () => {
    navigate(
      usertype === "education"
        ? "/forgot-password"
        : usertype === "healthcare"
        ? "/forgot-password-medical"
        : "/admin-forgot-password"
    );
  };

  const handleAdminLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8001/admin/adminlogin", {
        email,
        password,
      });

      console.log("Admin Login Response:", response.data);

      if (response.data.success) {
        localStorage.setItem("admin", JSON.stringify(response.data.admin));
        navigate("/admin-dashboard");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Admin Login Error:", error.response ? error.response.data : error.message);
      setError(error.response?.data?.message || "Server error");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }

    try {
      // For admin login, call the admin login handler
      if (usertype === "admin") {
        await handleAdminLogin(); // This handles admin login separately
      } else {
        const { data } = await axios.post("http://localhost:8001/user/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate(
            usertype === "education"
              ? "/user-dashboard"
              : usertype === "healthcare"
              ? "/medu-dashboard"  // Updated path for healthcare users
              : "/admin-dashboard"
          );
        } else {
          setError(data.message);
        }
        
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/login.jpg)" }}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-50 p-8 sm:p-10 rounded-lg shadow-2xl z-10 w-full max-w-md sm:max-w-lg md:max-w-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, duration: 0.8 }}
      >
        <h2
          className={`text-xl font-serif mb-4 text-center ${
            usertype === "education"
              ? "text-[#E76F51]"
              : usertype === "healthcare"
              ? "text-[#17A2B8]"
              : "text-gray-700"
          }`}
        >
          Login
        </h2>

        {/* User Type Selection - Buttons */}
        <div className="mb-4 flex justify-center ">
          {["education", "healthcare", "admin"].map((type) => (
            <motion.button
              key={type}
              onClick={() => setUsertype(type)}
              className={`px-4 py-2 text-xs font-semibold  transition ${
                usertype === type
                  ? type === "education"
                    ? "bg-[#E76F51] text-white"
                    : type === "healthcare"
                    ? "bg-[#17A2B8] text-white"
                    : "bg-gray-700 text-white"
                  : "bg-gray-300 text-black"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </motion.button>
          ))}
        </div>

        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4 mt-2">
            <label
              htmlFor="email"
              className="block py-2 text-gray-700 text-xs font-bold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4 mt-2">
            <label
              htmlFor="password"
              className="block py-2 text-gray-700 text-xs font-bold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
              required
            />
          </div>

          <motion.button
            type="submit"
            className={`w-full mt-6 mx-auto px-20 py-3 text-white text-xs font-serif rounded-md ${
              usertype === "education"
                ? "bg-[#E76F51] hover:bg-[#9f6b5e]"
                : usertype === "healthcare"
                ? "bg-[#17A2B8] hover:bg-[#70aeb8]"
                : "bg-gray-700 hover:bg-gray-900"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <div className="mt-3 text-center">
          <p className="text-xs">
            <motion.button
              onClick={handleForgotPasswordNavigate}
              className={`${
                usertype === "education"
                  ? "text-[#E76F51]"
                  : usertype === "healthcare"
                  ? "text-[#17A2B8]"
                  : "text-gray-700"
              } font-medium hover:underline`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Forgot Password?
            </motion.button>
          </p>
        </div>

        {usertype !== "admin" && (
          <div className="mt-3 text-center">
            <p className="text-xs font-medium text-gray-600">
              Don't have an account?{" "}
              <motion.button
                onClick={handleRegisterNavigate}
                className="text-[#E76F51] font-medium hover:underline"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Register Now
              </motion.button>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
