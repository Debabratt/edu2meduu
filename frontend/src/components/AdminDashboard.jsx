import React, { useState, useEffect } from "react";
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
  PhoneCall,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");

  


  const [formData, setFormData] = useState({
    name: "",
    ctitle: "",
    categoryType: "",
    userType:""
  });

  const [newsFormData, setNewsFormData] = useState({
    title: "",
    content: "",
    newsImage: "",
    moreContent:""
  });
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:8001/admin/getContacts");
        setContacts(response.data);
      } catch (err) {
        setError("Failed to fetch contacts.");
      }
    };

    fetchContacts();
  }, []);
  const handleNewsChange = (e) => {
    setNewsFormData({ ...newsFormData, [e.target.name]: e.target.value });
  };
  const handleNewsFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        setImage(file); // ✅ Store file correctly
        setFileName(file.name);

        // ✅ Ensure state consistency
        setNewsFormData((prevData) => ({
            ...prevData,
            newsImage: file, // This will not be sent as JSON, only used for reference
        }));
    }
};

const handleNewsSubmit = async (e) => {
    e.preventDefault();

    const trimedTitle = newsFormData.title?.trim();
    const trimedContent = newsFormData.content?.trim();
    const trimedMoreContent = newsFormData.moreContent?.trim();

    if (!trimedContent || !trimedTitle || !trimedMoreContent || !image) {
        alert("All fields including image are required");
        return;
    }

    console.log("Submitting with:", { trimedTitle, trimedContent, trimedMoreContent, image });

    // ✅ Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(image.type)) {
        alert("Please select a valid image file (JPEG, PNG, WebP, or GIF)");
        return;
    }

    // ✅ Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (image.size > maxSize) {
        alert("File size should be less than 5MB");
        return;
    }

    // ✅ Use FormData to send the file
    const formDataToSends = new FormData();
    formDataToSends.append("title", trimedTitle);
    formDataToSends.append("content", trimedContent);
    formDataToSends.append("moreContent", trimedMoreContent);
    formDataToSends.append("image", image); // ✅ Correctly attach file

    try {
        const response = await axios.post(
            "http://localhost:8001/admin/addNews",
            formDataToSends,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (response.data.success) {
            alert(response.data.message);
            // ✅ Reset form
            setNewsFormData({
                title: "",
                content: "",
                moreContent: "",
            });
            setFileName("");
            setImage(null);

            // ✅ Reset file input manually
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) {
                fileInput.value = "";
            }
        } else {
            throw new Error(response.data.message || "Failed to add News");
        }
    } catch (error) {
        console.error("Error details:", error.response?.data || error.message);
        alert("Error adding news. " + (error.response?.data?.message || "Please try again."));
    }
};







  //Addcategory
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.name?.trim();
    const trimmedTitle = formData.ctitle?.trim();
    const trimmedType = formData.categoryType?.trim();
    const trimmedUserType = formData.userType?.trim();
    if (!trimmedName || !trimmedTitle || !trimmedType ||!trimmedUserType || !image) {
      alert("All fields including image are required");
      return;
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(image.type)) {
      alert("Please select a valid image file (JPEG, PNG, or GIF)");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (image.size > maxSize) {
      alert("File size should be less than 5MB");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", trimmedName);
    formDataToSend.append("ctitle", trimmedTitle);
    formDataToSend.append("categoryType", trimmedType);
    formDataToSend.append("image", image);
    formDataToSend.append("userType", trimmedUserType);
    try {
      const response = await axios.post(
        "http://localhost:8001/admin/addCategory",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // Add timeout and retry logic
          timeout: 30000, // 30 seconds timeout
          maxRetries: 3,
          retryDelay: 1000,
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        // Reset form
        setFormData({
          name: "",
          ctitle: "",
          categoryType: "",
          userType:""
        });
        setFileName("");
        setImage(null);

        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = "";
        }
      } else {
        throw new Error(response.data.message || "Failed to add category");
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);

      let errorMessage = "Error adding category. ";
      if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += "Please try again.";
      }

      alert(errorMessage);
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
      const endpoint =
        selectedSection === "Education"
          ? isBlocked
            ? "http://localhost:8001/admin/unblockEducationUser"
            : "http://localhost:8001/admin/blockEducationUser"
          : isBlocked
          ? "http://localhost:8001/admin/unblockHealthcareUser"
          : "http://localhost:8001/admin/blockHealthcareUser";

      await axios.post(endpoint, { userId });
      selectedSection === "Education" ? fetchEduUsers() : fetchMedUsers();
    } catch (error) {
      console.error("Error toggling user block status:", error);
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
      { name: "User Inquiries", icon: <PhoneCall /> },
    ],
    Healthcare: [
      { name: "Dashboard", icon: <Home /> },
      { name: "Add Categories", icon: <Plus /> },
      { name: "Block Medical & Clinics", icon: <Ban /> },
      { name: "Add News", icon: <Newspaper /> },
      { name: "User Details", icon: <User /> },
      { name: "User Inquiries", icon: <PhoneCall /> },
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
          {users.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-100">
              <td className="py-3 px-4 border">
                <input
                  type="checkbox"
                  checked={selectedSchools.includes(user._id)}
                  onChange={() => handleSchoolSelection(user._id)}
                  className="h-4 w-4 text-blue-600"
                />
              </td>
              <td className="py-3 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.userType}</td>
              <td className="py-3 px-4 border">{user.location}</td>
              <td className="py-3 px-4 border text-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={() => onBlockUser(user._id)}
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
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category Title
                </label>
                <input
                  type="text"
                  name="ctitle"
                  value={formData.ctitle}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter category title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category Type
                </label>
                <select
                  name="categoryType"
                  value={formData.categoryType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Category Type</option>
                  {selectedSection === "Education" ? (
                    <>
                      <option value="Day School">Day School</option>
                      <option value="Boarding School">Boarding School</option>
                      <option value="Play School">Play School</option>
                      <option value="Private Tutor">Private Tutor</option>
                      <option value="Coaching Centre">Coaching Centre</option>
                    </>
                  ) : (
                    <>
                      <option value="Hospital">Hospital</option>
                      <option value="Private Clinic">Private Clinic</option>
                      <option value="Medical Stores">Medical Stores</option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Type
                </label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select User Type</option>
                  {selectedSection === "Education" ? (
                    <>
                      <option value="education">Education</option>
                     
                    </>
                  ) : (
                    <>
                      <option value="healthcare">HealthCare</option>
                  
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="image"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF ,WEBP up to 5MB
                    </p>
                    {fileName && (
                      <p className="mt-2 text-sm text-gray-600">
                        Selected file: {fileName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
            onSubmit={handleNewsSubmit}
            className="p-4 bg-white shadow-md rounded-lg space-y-4"
          >
            <input
              name="title"
              placeholder="News Title"
              value={newsFormData.title}
              onChange={handleNewsChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <textarea
              name="content"
              placeholder="Sub Content"
              value={newsFormData.content}
              onChange={handleNewsChange}
              required
              className="w-full p-2 border lg:p-5 border-gray-300 rounded-md"
            />
            <textarea
              name="moreContent"
              placeholder="Main Content"
              value={newsFormData.moreContent}
              onChange={handleNewsChange}
              required
              className="w-full p-2 border lg:p-10 border-gray-300 rounded-md"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="image"
                        type="file"
                        className="sr-only"
                        onChange={handleNewsFileChange}
                        accept="image/*"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF ,WEBP up to 5MB
                  </p>
                  {fileName && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: {fileName}
                    </p>
                  )}
                </div>
              </div>
            </div>

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
        case "User Inquiries":
        return (
          <div>
  {/* Inquiry Count */}
  <div className="w-full max-w-4xl flex justify-end mb-4">
    <span className="bg-[#E76F51] text-white px-6 py-2 rounded-full shadow-md">
      Total Inquiries: {contacts.length}
    </span>
  </div>

  {contacts.length > 0 ? (
    <div className="w-full  max-w-full overflow-hidden rounded-lg shadow-lg bg-white">
      <div className="overflow-x-auto sm:px-2 md:px-0">
        <table className="w-full border-collapse text-left text-sm md:text-base">
          <thead className="bg-[#E76F51] text-white">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr
                key={contact._id}
                className={`border-b transition hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4 text-xs md:text-base">{contact.name}</td>
                <td className="py-3 px-4 text-xs md:text-base">{contact.phone}</td>
                <td className="py-3 px-4 text-xs md:text-base">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-center">
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-green-600 hover:text-green-500"
                  >
                    <PhoneCall size={20} className="mx-auto cursor-pointer" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-600 mt-6">No user inquiries found.</p>
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
            className={`w-full md:w-72 bg-gray-900 text-white p-6 shadow-lg fixed md:sticky top-0 h-screen transition-transform ${
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
              className="w-full py-3 bg-[#E76F51] hover:bg-red-700 text-white font-semibold rounded-lg flex items-center justify-center gap-3 mt-6"
              onClick={() => {
                sessionStorage.removeItem("admin");
                navigate("/login");
              }}
            >
              <LogOut />
              Logout
            </button>
          </aside>
          <div
            className="flex-1  md:p-10 overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
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
            <div className="bg-gray-50 ">
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
