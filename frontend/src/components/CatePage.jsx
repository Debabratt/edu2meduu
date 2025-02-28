import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CatePage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    axios
      .get("http://localhost:8001/user/getAllUsers")
      .then((response) => {
        if (response.data && Array.isArray(response.data.users)) {
          const filteredSchools = response.data.users.filter(
            (school) => school.category === categoryName
          );
          setSchools(filteredSchools);
        } else {
          console.error("Unexpected response format", response.data);
          setError("Invalid data format received from the server.");
        }
      })
      .catch((error) => {
        console.error("Error fetching schools", error);
        setError("Failed to load data. Please try again later.");
      });
  }, [categoryName]);

  return (
    <div className="bg-amber-100 lg:mt-32 md:mt-22 min-h-screen py-10 px-8">
      <button
        className="mb-4 px-4 py-2 bg-[#17A2B8] text-white rounded-md"
        onClick={() => navigate("/")}
      >
        Back
      </button>

      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        {categoryName}
      </h2>

      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.length > 0 ? (
          schools.map((school, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/school/${school.id}`, { state: { school } })} // ✅ FIXED: Correct navigation
            >
              <img
                src={school.image || "/default-image.jpg"}
                alt={school.name}
                className="w-full h-40 object-cover rounded-t-md"
                onError={(e) => (e.target.src = "/default-image.jpg")}
              />
              <h2 className="text-lg font-bold text-gray-800 mt-3">
                {school.name || "No Name Available"}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {school.ctitle || "No Description Available"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No schools found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CatePage;
