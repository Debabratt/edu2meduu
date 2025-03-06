import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const EduResult = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    const address = queryParams.get("address");
    const category = queryParams.get("category");

    if (name || address || category) {
      fetchResults(name, address, category);
    }
  }, [location.search]);

  const fetchResults = async (name, address, category) => {
    setLoading(true);
    try {
      // Build query parameters dynamically
      const params = {};
      if (name) params.name = name;
      if (address) params.address = address;
      if (category) params.category = category;
  
      // Make the API call with dynamic query parameters
      const response = await axios.get(`http://localhost:8001/user/getAllUsers`, {
        params, // Pass the params object here
      });
  
      // Update the results state
      setResults(response.data.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-33">
      <h1>Education Results</h1>
      {results.length > 0 ? (
        results.map((result) => (
          <div key={result._id}>
            <h2>{result.name}</h2>
            <p>{result.description}</p>
            <p>{result.contact}</p>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default EduResult;