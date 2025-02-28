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
        // Fetch school details if not available
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
    <div className="mt-20">
      <div className="bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 min-h-screen py-12 px-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:shadow-lg"
          onClick={handleBack}
        >
          <FaArrowLeft /> Back
        </motion.button>

        <div className="max-w-4xl mx-auto">
          <motion.div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
            <img src={school.image || "/placeholder.svg"} alt={school.name} className="w-full h-64 object-cover" />

            <div className="p-6">
              <h2 className="text-3xl font-bold text-blue-700">{school.name}</h2>
              <p className="text-gray-600 text-lg">{school.motto || "Inspiring Education"}</p>

              <div className="mt-4">
                <FaMapMarkerAlt className="text-blue-500 inline-block mr-2" />
                <span>{school.address || "Address not available"}</span>
              </div>

              <div className="mt-6">
                <button
                  className="w-full py-4 bg-blue-500 text-white font-medium rounded-xl shadow-lg hover:bg-blue-600 transition"
                  onClick={() => school.phone && window.open(`tel:${school.phone}`, "_self")}
                >
                  {school.phone ? `Call ${school.name}` : "No Contact Available"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetail;
