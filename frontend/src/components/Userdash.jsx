import { useState } from "react";

const Userdash = () => {
  const [schoolName, setSchoolName] = useState("ABC Public School");
  const [address, setAddress] = useState("123, Main Street, City");
  const [email, setEmail] = useState("abcschool@gmail.com");
  const [phone, setPhone] = useState("9876543210");
  const [logo, setLogo] = useState(null);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen  bg-[#d5f3f7] flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-[] mb-6">
        Welcome to Edu2Medu 🎓
      </h1>

      <div className="w-full max-w-2xl bg-white shadow-lg p-6 rounded-2xl">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          School Dashboard
        </h2>

        {/* Logo Upload */}
        <div className="flex flex-col items-center mb-4">
          <label className="relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            {logo ? (
              <img
                src={logo}
                alt="School Logo"
                className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 shadow-md"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center border-2 border-gray-300 bg-gray-200 rounded-full">
                📷 Upload Logo
              </div>
            )}
          </label>
          <p className="text-sm text-gray-600 mt-2">Click to upload logo</p>
        </div>

        {/* Editable Form Fields */}
        <div className="space-y-4">
          <label className="block text-gray-700 font-medium">School Name</label>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-gray-700 font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-gray-700 font-medium">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Save Button */}
        <button className="w-full bg-blue-600 text-white mt-4 py-2 rounded-md hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Userdash;
