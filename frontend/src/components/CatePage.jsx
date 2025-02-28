import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CatePage = () => {
  const { categoryName } = useParams(); // Get category from URL
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get("http://localhost:8001/user/getAllUsers")
      .then(response => {
        console.log("All fetched data:", response.data);

        if (response.data && Array.isArray(response.data.users)) {
          // ✅ Filter based on category name
          const filteredSchools = response.data.users.filter(
            (school) => school.category === categoryName
          );

          setSchools(filteredSchools);
        } else {
          console.error("Unexpected response format", response.data);
          setError("Invalid data format received from the server");
        }
      })
      .catch(error => {
        console.error("Error fetching schools", error);
        setError("Failed to load data. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [categoryName]); // ✅ Re-fetch when category changes

  return (
    <div className="bg-amber-100 md:mt-32 min-h-screen py-10 px-8">
      <button 
        className="mb-4 px-4 py-2 bg-[#17A2B8] text-white rounded-md"
        onClick={() => navigate("/")}
      >
        Back
      </button>
      
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        {categoryName}
      </h2>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.length > 0 ? (
          schools.map((school, index) => (
            <div key={index} className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-transform transform hover:scale-105">
              <img 
                src={`http://localhost:8001/${school.image}`} 
                alt={school.name} 
                className="w-full h-40 object-cover rounded-t-md"
              />
              <h2 className="text-lg font-bold text-gray-800 mt-3">{school.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{school.ctitle}</p>
            </div>
          ))
        ) : (
          !loading && <p className="text-center text-gray-600">No schools found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CatePage;
