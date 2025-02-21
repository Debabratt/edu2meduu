import { useState, useEffect } from "react";
import axios from "axios";
import {
  Home,
  Plus,
  Ban,
  Newspaper,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    category: "",
    image: null,
  });

  const [formDataa, setFormDataa] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    createdBy: "admin_id_here", // Replace with actual admin ID from context
  });

  const handleChangee = (e) => {
    setFormData({ ...formDataa, [e.target.name]: e.target.value });
  };

  const handleSubmitt = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8001/admin/addNews", formDataa);
      alert("News added successfully");
      setFormData({ title: "", content: "", image: "", category: "", createdBy: "admin_id_here" });
      if (onSuccess) onSuccess();
    } catch (error) {
      alert("Error posting news");
    }
  };
  const handleChange = (e) => {
    setFormDataa({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.category) {
      alert("All fields except image are required!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name.trim());
    formDataToSend.append("address", formData.address.trim());
    formDataToSend.append("category", formData.category.trim());
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:8001/admin/addCategory",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        alert("Category added successfully!");
        setFormData({ name: "", address: "", category: "", image: null });
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert(error.response?.data?.error || "Failed to add category.");
    }
  };

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

  const fetchEduUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/admin/getEducationUsers"
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching Education users:", error);
    }
  };

  const fetchMedUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/admin/getHealthcareUsers"
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching Healthcare users:", error);
    }
  };

  const onBlockUser = async (userId, currentStatus) => {
    try {
      const isBlocked = currentStatus === "block";

      // Select API endpoint based on action
      const endpoint =
        selectedSection === "Education"
          ? isBlocked
            ? "http://localhost:8001/admin/unblockEducationUser"
            : "http://localhost:8001/admin/blockEducationUser"
          : isBlocked
          ? "http://localhost:8001/admin/unblockHealthcareUser"
          : "http://localhost:8001/admin/blockHealthcareUser";

      await axios.post(endpoint, { userId });

      // Refresh the user list
      selectedSection === "Education" ? fetchEduUsers() : fetchMedUsers();
    } catch (error) {
      console.error("❌ Error toggling user block status:", error);
      alert("Failed to update user status.");
    }
  };

  const handleSchoolSelection = (schoolId) => {
    setSelectedSchools((prev) => {
      if (prev.includes(schoolId)) {
        return prev.filter((id) => id !== schoolId);
      } else {
        return [...prev, schoolId];
      }
    });
  };

  // Load appropriate users when section changes
  useEffect(() => {
    if (selectedSection === "Education") {
      fetchEduUsers();
    } else if (selectedSection === "Healthcare") {
      fetchMedUsers();
    }
  }, [selectedSection]);

  const sidebarOptions = {
    Education: [
      { name: "Dashboard", icon: <Home /> },
      { name: "Add Categories", icon: <Plus /> },
      { name: "Block School & College", icon: <Ban /> },
      { name: "Add News", icon: <Newspaper /> },
      { name: "User Details", icon: <User /> },
    ],
    Healthcare: [
      { name: "Dashboard", icon: <Home /> },
      { name: "Add Categories", icon: <Plus /> },
      { name: "Block Medical & Clinics", icon: <Ban /> },
      { name: "Add News", icon: <Newspaper /> },
      { name: "User Details", icon: <User /> },
    ],
  };

  const renderEducationTable = () => (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-4">
        <span className="bg-blue-500 text-white px-4 py-2 rounded-full">
          Total Schools: {users.length}
        </span>
        {selectedSchools.length > 0 && (
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Block Selected ({selectedSchools.length})
          </button>
        )}
      </div>
      <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4 border text-left">Select</th>
            <th className="py-3 px-4 border text-left">Name</th>
            <th className="py-3 px-4 border text-left">Type</th>
            <th className="py-3 px-4 border text-left">Category</th>
            <th className="py-3 px-4 border text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((school) => (
            <tr key={school._id} className="border-b hover:bg-gray-100">
              <td className="py-3 px-4 border">
                <input
                  type="checkbox"
                  checked={selectedSchools.includes(school._id)}
                  onChange={() => handleSchoolSelection(school._id)}
                  className="h-4 w-4 text-blue-600"
                />
              </td>
              <td className="py-3 px-4 border">{school.name}</td>
              <td className="py-3 px-4 border">{school.userType}</td>
              <td className="py-3 px-4 border">{school.category}</td>
              <td className="py-3 px-4 border text-center">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    school.status === "block"
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                  onClick={() => onBlockUser(school._id, school.status)}
                >
                  {school.status === "block" ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderUserTable = () => (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-4">
        <span className="bg-blue-500 text-white px-4 py-2 rounded-full">
          Total Active Users: {users.length}
        </span>
      </div>
      <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4 border text-left">Select</th>
            <th className="py-3 px-4 border text-left">Name</th>
            <th className="py-3 px-4 border text-left">Type</th>
            <th className="py-3 px-4 border text-left">Location</th>
            <th className="py-3 px-4 border text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((users) => (
            <tr key={users._id} className="border-b hover:bg-gray-100">
              <td className="py-3 px-4 border">
                <input
                  type="checkbox"
                  checked={selectedSchools.includes(users._id)}
                  onChange={() => handleSchoolSelection(users._id)}
                  className="h-4 w-4 text-blue-600"
                />
              </td>
              <td className="py-3 px-4 border">{users.name}</td>
              <td className="py-2 px-4 border">{users.userType}</td>
              <td className="py-3 px-4 border">{users.location}</td>
              <td className="py-3 px-4 border text-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={() => onBlockUser(users._id)}
                >
                  Block
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMainContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return <p>Here is an overview of the {selectedSection} Dashboard.</p>;
      case "Add Categories":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Add Categories for {selectedSection}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
              >
                Add Category
              </button>
            </form>
          </div>
        );

      case "Block School & College":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Block Education Institutions
            </h3>
            {users.length > 0 ? (
              renderEducationTable()
            ) : (
              <p className="text-gray-600">
                No educational institutions found.
              </p>
            )}
          </div>
        );
      case "Block Medical & Clinics":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Block Healthcare Institutions
            </h3>
            {users.length > 0 ? (
              renderUserTable()
            ) : (
              <p className="text-gray-600">No healthcare institutions found.</p>
            )}
          </div>
        );
      case "Add News":
        return (
          <form
            onSubmit={handleSubmitt}
            className="p-4 bg-white shadow-md rounded-lg space-y-4"
          >
            <input
              name="title"
              placeholder="News Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <textarea
              name="content"
              placeholder="News Content"
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              name="image"
              placeholder="Image URL (optional)"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
            type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
            >
              Post News
            </button>
          </form>
        );
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
            } md:translate-x-0 z-50`}
          >
            <div className="flex justify-between items-center md:hidden">
              <h1 className="text-2xl font-bold">{selectedSection} Panel</h1>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white"
              >
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
          <div className="flex-1 p-6 md:p-10">
            <div className="flex justify-between items-center mb-6">
              <button
                className="md:hidden text-gray-800"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={28} />
              </button>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                {activeItem}
              </h2>
            </div>
            <p className="text-gray-600 text-center items-center justify-center mb-6">
              Welcome to {selectedSection} - {activeItem}
            </p>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg border">
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
            <div className="mt-10 lg:px-30 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
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
