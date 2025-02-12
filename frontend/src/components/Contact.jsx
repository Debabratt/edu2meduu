import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div
      className="min-h-auto flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/contact.jpg')", // Ensure your image is in the public folder
        backgroundSize: "cover", // Ensures the background image scales well
        backgroundPosition: "center", // Centers the background image
        backgroundAttachment: "fixed", // Makes background image stay fixed during scroll
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E2939] via-transparent to-transparent opacity-60"></div>
      
      <div className="container mt-17 mb-17 mx-auto flex flex-col items-center justify-center space-y-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Reduced contact box size */}
          <div className="bg-opacity-80 bg-[#1E2939] px-4 py-6 rounded-lg max-w-xs w-full shadow-xl">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Feel Free to Contact <span className="text-[#e69721]">Us</span>
            </h1>

            <div className="space-y-4 w-full mt-4">
              <div className="flex flex-col space-y-3">
                <label htmlFor="name" className="text-lg text-white">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3 py-2 text-white w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88429] placeholder-gray-500"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="flex flex-col space-y-3">
                <label htmlFor="phone" className="text-lg text-white">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-3 py-2 text-white w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88429] placeholder-gray-500"
                  placeholder="+91 0000 0000 00"
                />
              </div>
            </div>

            <button className="mt-4 w-full py-2 bg-[#D88429] text-white rounded-lg hover:bg-[#67533e] transition duration-300">
              Request Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
