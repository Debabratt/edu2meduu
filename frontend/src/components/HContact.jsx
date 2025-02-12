import { Mail, Phone, MapPin} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function HContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

    
 

  return (
    <div className="container mx-auto px-4 md:px-14  bg-gradient-to-r from-white to-[#c4ecf6]">
      <div className="grid mt-23 gap-6 sm:grid-cols-1 px-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Email Card */}
        <motion.div
          className="bg-white mt-30 p-6 rounded-lg shadow-lg transform transition-all "
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Mail className="h-6 w-6 text-[#17A2B8]" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">Email Address</h3>
              <p className="text-sm text-gray-500">Reach us anytime</p>
              <div className="space-y-1 pt-2">
                <p className="text-gray-600">info@edu2medu.com</p>
                <p className="text-gray-600">support@edu2medu.com</p>
              </div>
            </div>
          </div>
          <div>
            <a href="mailto:info@company.com" className="inline-flex items-center text-[#17A2B8] hover:text-blue-700">
           
            </a>
          </div>
        </motion.div>

        {/* Phone Card */}
        <motion.div
          className="bg-white p-6 lg:mt-30 rounded-lg shadow-lg transform transition-all hover:scale-105"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Phone className="h-6 w-6 text-[#17A2B8]" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">Phone Number</h3>
              <p className="text-sm text-gray-500">Give us a call</p>
              <div className="space-y-1 pt-2">
                <p className="text-gray-600">+91-9876543210</p>
                <p className="text-gray-600">+1-800-123-4567</p>
              </div>
            </div>
          </div>
          <div>
            <a href="tel:+919876543210" className="inline-flex items-center text-blue-600 hover:text-blue-700">
           
            </a>
          </div>
        </motion.div>

        {/* Office Address Card */}
        <motion.div
          className="bg-white p-6 lg:mt-30 rounded-lg shadow-lg transform transition-all hover:scale-105"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <MapPin className="h-6 w-6 text-[#17A2B8]" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">Office Address</h3>
              <p className="text-sm text-gray-500">Visit us at</p>
              <div className="space-y-1 pt-2">
                <p className="text-gray-600">123 Main Street, Suite 456</p>
                <p className="text-gray-600">City, STATE-123456, Country</p>
              </div>
            </div>
          </div>
          <div>
            <a href="https://www.google.com/maps" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            
            </a>
          </div>
        </motion.div>
      </div>
      <div
      className="min-h-auto mt-30 flex items-center justify-center bg-cover bg-center relative"
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
      
    </div>
  );
}
