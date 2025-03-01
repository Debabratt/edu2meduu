import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Category from "./components/Category";
import Contact from "./components/Contact";
import DaySchoolCarousel from "./components/DaySchoolCarousel";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Marque from "./components/Marque";
import Statistics from "./components/Statistics";
import BoardingSchool from "./components/EducationList";
import DaySchool from "./components/DaySchool";
import PreSchool from "./components/PreSchool";
import Login from "./components/Login";
import HMarque from "./components/HMarque";
import HCategory from "./components/HCategory";
import HStatistics from "./components/HStatistics";
import HContact from "./components/HContact";
import MedicalCl from "./components/MedicalCl";
import DaySchoolM from "./components/DaySchoolM";
import News from "./components/News";
import Jobs from "./components/Jobs";
import About from "./components/About";
import EmRegister from "./components/EmRegister";
import AdminDashboard from "./components/AdminDashboard";
import ForgotPassword from "./components/ForgotPassword";
import CatePage from "./components/CatePage";
import Medicategory from "./components/Medicategory.jsx";
import MeduDetail from "./components/MeduDetail.jsx";
import SchoolDetail from "./components/SchoolDetail.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UserDashboard from "./components/UserDashboard";

// Layout component that includes Header and Footer
const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
              <Marque />
              <Category />
              <DaySchoolCarousel />
              <Contact />
              <Statistics />
            </MainLayout>
          }
        />

        {/* Healthcare Route */}
        <Route
          path="/healthcare"
          element={
            <MainLayout>
              <Home />
              <HMarque />
              <HCategory />
              <MedicalCl />
              <Contact />
              <HStatistics />
            </MainLayout>
          }
        />

        {/* Register Route */}
        <Route
          path="/register"
          element={
            <MainLayout>
              <EmRegister />
            </MainLayout>
          }
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredUserType="admin">
             
                <AdminDashboard />
             
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute requiredUserType="user">
              <MainLayout>
                <UserDashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Education Routes */}
        <Route
          path="/board-school"
          element={
            <MainLayout>
              <BoardingSchool />
            </MainLayout>
          }
        />
        <Route
          path="/day-school"
          element={
            <MainLayout>
              <DaySchool />
            </MainLayout>
          }
        />
        <Route
          path="/pre-schools"
          element={
            <MainLayout>
              <PreSchool />
            </MainLayout>
          }
        />

        {/* Healthcare Routes */}
        <Route
          path="/hospitals"
          element={
            <MainLayout>
              <MedicalCl />
            </MainLayout>
          }
        />

        {/* Forgot Password Route */}
        <Route
          path="/forgot-password"
          element={
            <MainLayout>
              <ForgotPassword />
            </MainLayout>
          }
        />

        {/* Category Routes */}
        <Route
          path="/category/:categoryName"
          element={
            <MainLayout>
              <CatePage />
            </MainLayout>
          }
        />
        <Route
          path="/medicalcategory/:categoryName"
          element={
            <MainLayout>
              <Medicategory />
            </MainLayout>
          }
        />

        {/* Detail Routes */}
        <Route
          path="/medu-details"
          element={
            <MainLayout>
              <MeduDetail />
            </MainLayout>
          }
        />
        <Route
          path="/schools"
          element={
            <MainLayout>
              <SchoolDetail />
            </MainLayout>
          }
        />

        {/* Other Routes */}
        <Route
          path="/jobs"
          element={
            <MainLayout>
              <Jobs />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <HContact />
            </MainLayout>
          }
        />
        <Route
          path="/school"
          element={
            <MainLayout>
              <DaySchoolM />
            </MainLayout>
          }
        />
        <Route
          path="/news"
          element={
            <MainLayout>
              <News />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;