const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <nav>
          <ul className="space-y-3">
            <li>
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                Users
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
        <p className="mt-2 text-gray-600">Welcome to the admin panel.</p>

        {/* Example Content Box */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium">Dashboard Overview</h3>
          <p className="text-gray-700 mt-2">Some useful statistics and insights go here.</p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
