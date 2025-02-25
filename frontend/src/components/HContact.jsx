import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function HContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="w-full mt-30 px-4 py-30 bg-gradient-to-r from-white to-[#c4ecf6]">
      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Email Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg transform transition-all"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Mail className="h-6 w-6 text-[#17A2B8]" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Email Address</h3>
              <p className="text-sm text-gray-500">Reach us anytime</p>
              <p className="text-gray-600">info@edu2medu.com</p>
              <p className="text-gray-600">support@edu2medu.com</p>
            </div>
          </div>
        </motion.div>

        {/* Phone Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg transform transition-all"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center  mb-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Phone className="h-6 w-6 text-[#17A2B8]" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Phone Number</h3>
              <p className="text-sm text-gray-500">Give us a call</p>
              <p className="text-gray-600">+91-9876543210</p>
              <p className="text-gray-600">+1-800-123-4567</p>
            </div>
          </div>
        </motion.div>

        {/* Office Address Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg transform transition-all"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <MapPin className="h-6 w-6 text-[#17A2B8]" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Office Address</h3>
              <p className="text-sm text-gray-500">Visit us at</p>
              <p className="text-gray-600">123 Main Street, Suite 456</p>
              <p className="text-gray-600">City, STATE-123456, Country</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Form */}
      <div className="mt-12 flex flex-col py-20 items-center px-4 sm:px-8 lg:px-16">
        <div className="bg-[#1E2939] p-6 rounded-lg shadow-xl w-full max-w-md">
          <h1 className="text-xl sm:text-2xl font-bold text-white text-center">
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
                className="px-3 py-2 text-white w-full bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88429] placeholder-gray-400"
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
                className="px-3 py-2 text-white w-full bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88429] placeholder-gray-400"
                placeholder="+91 0000 0000 00"
              />
            </div>
          </div>
          <button className="mt-4 w-full py-2 bg-[#D88429] text-white rounded-lg hover:bg-[#b96c1f] transition duration-300">
            Request Call
          </button>
        </div>
      </div>
    </div>
  );
}
