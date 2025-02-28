import { useNavigate, useLocation } from "react-router-dom";

const MeduDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user; // ✅ Get user data from navigation state

  if (!user) {
    return <p className="text-center text-red-600">User details not found.</p>;
  }

  return (
    <div className="bg-[#98cdc6] min-h-screen py-10 px-8">
      <button
        className="mb-4 px-4 py-2 bg-[#17A2B8] text-white rounded-md"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <div className="bg-white shadow-md rounded-md p-6 max-w-lg mx-auto">
        <img
          src={user.image || "/default-image.jpg"}
          alt={user.name}
          className="w-full h-40 object-cover rounded-t-md"
          onError={(e) => (e.target.src = "/default-image.jpg")}
        />
        <h2 className="text-2xl font-bold text-gray-800 mt-3">
          {user.name || "No Name Available"}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {user.ctitle || "No Description Available"}
        </p>
        <p className="text-gray-600 text-sm mt-1">
          <strong>Address:</strong> {user.address || "No Address Available"}
        </p>
        <p className="text-gray-600 text-sm mt-1">
          <strong>Contact:</strong> {user.contact || "No Contact Information"}
        </p>
      </div>
    </div>
  );
};

export default MeduDetail;
