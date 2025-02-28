import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaMapMarkerAlt, FaPhoneAlt, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";

const SchoolDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { schoolId } = useParams();
  const [school, setSchool] = useState(location.state?.school || null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!school) {
      const savedSchool = sessionStorage.getItem("selectedSchool");
      if (savedSchool) {
        setSchool(JSON.parse(savedSchool));
      } else {
        axios.get(`http://localhost:8001/user/getUserById/${schoolId}`)
          .then((response) => {
            setSchool(response.data);
            sessionStorage.setItem("selectedSchool", JSON.stringify(response.data));
          })
          .catch((error) => console.error("Error fetching school:", error));
      }
    } else {
      sessionStorage.setItem("selectedSchool", JSON.stringify(school));
    }

    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [schoolId, school]);

  const handleBack = () => {
    sessionStorage.removeItem("selectedSchool");
    navigate("/schools");
  };

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-xl text-center"
        >
          <p className="text-red-600 text-lg font-semibold">School details not found.</p>
          <button
            className="mt-4 flex items-center justify-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-30 xl:mt-32">
      <div className="bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden lg:flex fixed top-4 left-4 z-50 items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:shadow-lg transition duration-300"
          onClick={handleBack}
        >
          <FaArrowLeft />
          <span>Back to List</span>
        </motion.button>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100"
          >
            <div className="relative">
              <div className="relative w-full h-52 sm:h-72 md:h-96 overflow-hidden">
                <motion.img
                  src={school.image || "/placeholder.svg"}
                  alt={school.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } }}
                />
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-3xl font-bold text-blue-700 text-center">{school.name}</h2>
              <p className="text-gray-600 text-lg text-center">{school.motto || "Inspiring Education"}</p>
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl relative">
                <FaQuoteLeft className="absolute top-4 left-4 text-blue-200 text-xl" />
                <p className="text-gray-700 leading-relaxed">{school.description || "No additional information available."}</p>
                <FaQuoteRight className="absolute bottom-4 right-4 text-blue-200 text-xl" />
              </div>
              <div className="mt-6 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                <span>{school.address || "Address not available"}</span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <button
                  className="w-full py-4 bg-blue-500 text-white font-medium rounded-xl shadow-lg hover:bg-blue-600 transition duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                  onClick={() => school.phone && window.open(`tel:${school.phone}`, "_self")}
                >
                  {school.phone ? `Call ${school.name}` : "No Contact Available"}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetail;
