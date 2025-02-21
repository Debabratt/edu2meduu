import { useState, useEffect } from "react";
import axios from "axios"; // ✅ Import Axios
import {
  Home,
  Plus,
  Ban,
  Newspaper,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [users, setUsers] = useState([]); // ✅ Store user data

  // 🌍 Set greeting based on time
  useEffect(() => {
    const indiaTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      hour12: true,
    });

    const hour = parseInt(indiaTime.split(" ")[0]);
    setGreeting(
      hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening"
    );
  }, []);

  // 🌍 Fetch Education users from API
  const fetchEduUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8001/admin/getEducationUsers");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching Education users:", error);
    }
  };

  // 🌍 Fetch Healthcare users from API
  const fetchMedUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8001/admin/getHealthcareUsers");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching Healthcare users:", error);
    }
  };

  // Sidebar Options for Education & Healthcare
  const sidebarOptions = {
    Education: [
      { name: "Dashboard", icon: <Home /> },
      { name: "Add Categories", icon: <Plus /> },
      { name: "Block School & College", icon: <Ban /> },
      { name: "Add News", icon: <Newspaper /> },
      {
        name: "User Details",
        icon: <User />,
        action: fetchEduUsers, // ✅ Fetch users when clicked
      },
      { name: "Settings", icon: <Settings /> },
    ],
    Healthcare: [
      { name: "Dashboard", icon: <Home /> },
      { name: "Add Categories", icon: <Plus /> },
      { name: "Block Medical & Clinics", icon: <Ban /> },
      { name: "Add News", icon: <Newspaper /> },
      {
        name: "User Details",
        icon: <User />,
        action: fetchMedUsers, // ✅ Fetch users when clicked
      },
      { name: "Settings", icon: <Settings /> },
    ],
  };

  const renderMainContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return <p>Here is an overview of the {selectedSection} Dashboard.</p>;
      case "Add Categories":
        return <p>Add new categories for {selectedSection} here.</p>;
      case "Block School & College":
      case "Block Medical & Clinics":
        return <p>Manage blocked institutions under {selectedSection}.</p>;
      case "Add News":
        return <p>Publish new updates related to {selectedSection}.</p>;
      case "User Details":
        return (
          <div>
          <h3 className="text-lg flex font-semibold mb-4">
            {selectedSection} User List
          </h3>
          <div className="flex justify-end mb-2">
            <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-right">
              Total Active Users: {users.length}
            </span>
          </div>
          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-100">
                      <td className="py-2 px-4 border">{user.name}</td>
                      <td className="py-2 px-4 border">{user.email}</td>
                      <td className="py-2 px-4 border">{user.userType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No users found for {selectedSection}.</p>
          )}
        </div>
        
        );
      case "Settings":
        return <p>Adjust settings for {selectedSection} administration.</p>;
      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {selectedSection ? (
        <div className="flex flex-col md:flex-row min-h-screen w-full">
          <aside
            className={`w-full md:w-72 bg-gray-900 text-white p-6 shadow-lg fixed md:relative transition-transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
          >
            <div className="flex justify-between items-center md:hidden">
              <h1 className="text-2xl font-bold">{selectedSection} Panel</h1>
              <button onClick={() => setIsMenuOpen(false)} className="text-white">
                <X size={28} />
              </button>
            </div>
            <nav className="mt-4">
              <ul className="space-y-3">
                {sidebarOptions[selectedSection].map((item, index) => (
                  <li key={index}>
                    <button
                      className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg transition duration-300 text-left ${
                        activeItem === item.name
                          ? "bg-[#364153]"
                          : "hover:bg-gray-700"
                      }`}
                      onClick={() => {
                        setActiveItem(item.name);
                        setIsMenuOpen(false);
                        if (item.action) item.action(); // ✅ Call function if exists
                      }}
                    >
                      {item.icon}
                      <span className="text-lg">{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <button
              className="w-full py-3 bg-[#c96d26] hover:bg-red-700 text-white font-semibold rounded-lg flex items-center justify-center gap-3 mt-6"
              onClick={() => setSelectedSection(null)}
            >
              <LogOut />
              Logout
            </button>
          </aside>
          <div className="flex-1 p-6 md:p-10 bg-white shadow-md rounded-lg">
            <button
              className="md:hidden text-gray-800"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              {activeItem}
            </h2>
            <p className="mt-2 text-gray-600">
              Welcome to {selectedSection} - {activeItem}.
            </p>
            <div className="mt-6 bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm border">
              {renderMainContent()}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="min-h-screen w-full flex flex-col items-center justify-center text-center bg-cover bg-center px-4"
          style={{ backgroundImage: 'url("/admin1.jpg")' }}
        >
          <div className="bg-opacity-70 mb-20 p-6 md:p-10 rounded-lg">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#E76F51] to-[#17A2B8] text-transparent bg-clip-text">
              Welcome, Admin
            </h1>
            <p className="text-xl md:text-2xl mt-5 text-gray-600">
              {greeting}, Admin!
            </p>
            <div className="mt-10 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              <button
                className="px-6 py-3 bg-[#E76F51] text-white rounded-lg"
                onClick={() => setSelectedSection("Education")}
              >
                Education
              </button>
              <button
                className="px-6 py-3 bg-[#17A2B8] text-white rounded-lg"
                onClick={() => setSelectedSection("Healthcare")}
              >
                Healthcare
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
