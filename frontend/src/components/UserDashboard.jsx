import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  User,
  Activity,
  HelpCircle,
  LogOut,
  Info,
  MessageCircle,
  Settings,
  Edit3,
  Camera,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Menu,
  X,
} from "lucide-react";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null); // Reference for sidebar
  const menuButtonRef = useRef(null); // Reference for the hamburger menu button

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    } else {
      navigate("/"); // Navigate to login if user data doesn't exist
    }
  }, [navigate]);

  useEffect(() => {
    // Handle outside click to close sidebar
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target) && 
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderContent = () => {
    if (!user) return null;
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="p-6 text-gray-800">
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-8 h-8 text-gray-500" />
              <h1 className="text-2xl font-semibold">{user.userType} Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-3 cursor-pointer hover:bg-gray-100">
                <Info className="w-8 h-8 text-blue-500" />
                <p className="text-lg font-semibold">View Your Status</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-3 cursor-pointer hover:bg-gray-100">
                <MessageCircle className="w-8 h-8 text-green-500" />
                <p className="text-lg font-semibold">Contact Support</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-3 cursor-pointer hover:bg-gray-100">
                <Settings className="w-8 h-8 text-yellow-500" />
                <p className="text-lg font-semibold">Update Your Profile</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-3 cursor-pointer hover:bg-gray-100">
                <User className="w-8 h-8 text-purple-500" />
                <p className="text-lg font-semibold">Manage Account</p>
              </div>
            </div>
          </div>
        );
      case "updateProfile":
        return (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Update {user.userType} Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Edit3 className="w-6 h-6 text-blue-500" />
                <input type="text" placeholder="Change Name" className="p-2 border border-gray-300 rounded-md w-full" />
              </div>
              <div className="flex items-center space-x-3">
                <Home className="w-6 h-6 text-green-500" />
                <input type="text" placeholder="Change Address" className="p-2 border border-gray-300 rounded-md w-full" />
              </div>
              <div className="flex items-center space-x-3">
                <Camera className="w-6 h-6 text-yellow-500" />
                <input type="file" className="p-2 border border-gray-300 rounded-md w-full" />
              </div>
              <div className="flex items-center space-x-3">
                <Edit3 className="w-6 h-6 text-red-500" />
                <textarea placeholder="Update Description" className="p-2 border border-gray-300 rounded-md w-full"></textarea>
              </div>
            </div>
          </div>
        );
      case "status":
        return (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
  <h2 className="text-xl font-semibold mb-4">{user.userType} Status</h2>

  {user.status === "block" ? (
    <div>
      <div className="flex items-center space-x-3 text-red-500">
        <XCircle className="w-8 h-8" />
        <p className="text-lg font-semibold">Your account is currently blocked.</p>
      </div>
      <p className="mt-2 text-red-600">If you believe this is a mistake, please contact our support team or request an unblock by sending a message to the admin.</p>
      
      {/* Instructional Content */}
      <div className="mt-6 bg-yellow-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold text-yellow-600">How to Request Unblock:</h3>
        <ul className="list-inside list-disc text-gray-600">
          <li>Describe the issue you're facing clearly and provide any relevant details.</li>
          <li>Ensure to mention your username or account email for quick identification.</li>
          <li>If this is a system-generated block, the admin will review and resolve it accordingly.</li>
        </ul>
      </div>

      {/* Unblock Request Form */}
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md mt-4"
        placeholder="Write your message to the admin..."
      ></textarea>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
        Send Request
      </button>

      <div className="mt-6 bg-gray-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold">Need Immediate Assistance?</h3>
        <p className="text-gray-600">
          You can also get in touch with our support team by calling or emailing us:
        </p>
        <ul className="text-blue-500">
          <li><strong>Phone:</strong> +1 800 123 4567</li>
          <li><strong>Email:</strong> support@example.com</li>
        </ul>
      </div>
    </div>
  ) : (
    <div>
      <div className="flex items-center space-x-3 text-green-500">
        <CheckCircle className="w-8 h-8" />
        <p className="text-lg font-semibold">Your account is active and fully functional.</p>
      </div>
      
      {/* Encouragement Content */}
      <div className="mt-6 bg-green-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold text-green-600">Stay Active and Explore More:</h3>
        <p className="text-gray-600">
          Enjoy your time on the platform! Make sure to regularly update your profile to enhance your experience. Here are some things you can do:
        </p>
        <ul className="list-inside list-disc text-gray-600">
          <li>Complete your profile with the latest information.</li>
          <li>Check out new features that are available to you.</li>
          <li>Review your privacy settings to make sure your data is secure.</li>
        </ul>
      </div>

      {/* Additional Links */}
      <div className="mt-6 bg-gray-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold">Need Help or Have Questions?</h3>
        <p className="text-gray-600">
          If you need assistance or have any questions about your account or how to make the most of our platform, feel free to contact our support team.
        </p>
        <ul className="text-blue-500">
          <li><strong>Help Center:</strong> <a href="#" className="hover:underline">Visit our Help Center</a></li>
          <li><strong>Contact Us:</strong> <a href="#" className="hover:underline">Submit a Support Request</a></li>
        </ul>
      </div>
    </div>
  )}
</div>

        );
      case "support":
        return (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">{user.userType} Support</h2>
          <p className="text-gray-600 mb-4">Need help? Our support team is here to assist you.</p>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              className="bg-gray-100 p-4 rounded-md flex items-center space-x-3 cursor-pointer hover:bg-gray-200"
              onClick={() => window.location.href = 'tel:+18001234567'} // This will trigger the phone dialer
            >
              <Phone className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-lg font-semibold">Call Us</p>
                <p className="text-gray-600">+1 800 123 4567</p>
              </div>
            </div>
        
            <div
              className="bg-gray-100 p-4 rounded-md flex items-center space-x-3 cursor-pointer hover:bg-gray-200"
              onClick={() => window.location.href = 'mailto:support.edu2medu@gmail.com'} // This will open the email client
            >
              <Mail className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-lg font-semibold">Email Us</p>
                <p className="text-gray-600">support.edu2medu@gmail.com</p>
              </div>
            </div>
          </div>
        
          <div className="mt-6">
            <p className="text-gray-600 mb-2">Submit a support request:</p>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Describe your issue..."
            ></textarea>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
              Submit Request
            </button>
          </div>
        </div>
        
        );
      default:
        return (
          <div className="p-6 text-gray-800">{user.userType} Dashboard</div>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`w-full md:w-64 bg-gray-900 text-white p-6 flex flex-col justify-between transition-all duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-50`}
      >
        <div>
          <h2 className="text-xl font-semibold mb-6 text-center">
            Welcome <br /> {user?.name || "User"}
          </h2>
          <ul className="space-y-2">
            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer transition duration-300 hover:bg-gray-700 ${activeTab === "dashboard" ? "bg-gray-800" : ""}`}
              onClick={() => { setActiveTab("dashboard"); setIsSidebarOpen(false); }}
            >
              <Home className="w-5 h-5 mr-3" /> Dashboard
            </li>
            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer transition duration-300 hover:bg-gray-700 ${activeTab === "updateProfile" ? "bg-gray-800" : ""}`}
              onClick={() => { setActiveTab("updateProfile"); setIsSidebarOpen(false); }}
            >
              <User className="w-5 h-5 mr-3" /> Update Profile
            </li>
            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer transition duration-300 hover:bg-gray-700 ${activeTab === "status" ? "bg-gray-800" : ""}`}
              onClick={() => { setActiveTab("status"); setIsSidebarOpen(false); }}
            >
              <Activity className="w-5 h-5 mr-3" /> Status
            </li>
            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer transition duration-300 hover:bg-gray-700 ${activeTab === "support" ? "bg-gray-800" : ""}`}
              onClick={() => { setActiveTab("support"); setIsSidebarOpen(false); }}
            >
              <HelpCircle className="w-5 h-5 mr-3" /> Support
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <button
          className="flex items-center justify-center w-full p-3 mt-4 bg-red-600 hover:bg-red-700 rounded-lg transition duration-300"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          <LogOut className="w-5 h-5 mr-3" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white shadow-md rounded-lg m-4 overflow-auto">
        {renderContent()}
      </div>

      {/* Hamburger Menu Button for Mobile */}
      <button
        ref={menuButtonRef}
        className="md:hidden fixed top-4 left-4 z-60 p-3 bg-gray-800 text-white rounded-full"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
