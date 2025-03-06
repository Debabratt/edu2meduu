import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const MeduResult = () => {
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
    try {
      const response = await axios.get(
        `http://localhost:8001/user/searchHealthcare?name=${name}&address=${address}&category=${category}`
      );
      setResults(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching results:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-33">
      <h1>Healthcare Results</h1>
      {results.length > 0 ? (
        results.map((user) => (
          <div key={user._id}>
            <h2>{user.name}</h2>
           
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default MeduResult;