import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Category from "./components/Category";
import Contact from "./components/Contact";
import DaySchoolCarousel from "./components/DaySchoolCarousel";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Marque from "./components/Marque";
import Statistics from "./components/Statistics";
import BoardingSchool from "./components/BoardingSchool";
import DaySchool from "./components/DaySchool";
import PreSchool from "./components/PreSchool";

import Login from "./components/Login";

import HMarque from "./components/HMarque";
import HCategory from "./components/HCategory";
import HStatistics from "./components/HStatistics";
import HContact from "./components/HContact";
import MedicalC from "./components/MedicalC";
import MedicalCl from "./components/MedicalCl";
import DaySchoolM from "./components/DaySchoolM";
import News from "./components/News";

import Jobs from "./components/Jobs";
import About from "./components/About";

import Userdash from "./components/Userdash";
import EmRegister from "./components/EmRegister";
import AdminDashboard from "./components/AdminDashboard";

// Layout component that includes Header
const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

// Layout component without Header for specific routes
const NoHeaderLayout = ({ children }) => (
  <>
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route with Header */}
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

        {/* Healthcare Route with Header */}
        <Route
          path="/healthcare"
          element={
            <MainLayout>
              <Home />
              <HMarque />
              <HCategory />
              <MedicalC />
              <HContact />
              <HStatistics />
            </MainLayout>
          }
        />

        {/* Register and Login Routes with Footer only */}
        <Route path="/register" element={<MainLayout><EmRegister /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />

        {/* User Dashboard Route without Header */}
        <Route path="/user-dashboard" element={<Userdash />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* School and Boarding Routes with Header */}
        <Route path="/board-school" element={<MainLayout><BoardingSchool /></MainLayout>} />
        <Route path="/day-school" element={<MainLayout><DaySchool /></MainLayout>} />
        <Route path="/pre-schools" element={<MainLayout><PreSchool /></MainLayout>} />

        {/* Hospitals Route with Footer only */}
        <Route path="/hospitals" element={<MainLayout><MedicalCl /></MainLayout>} />

        {/* Other Routes */}
        <Route path="/jobs" element={<MainLayout><Jobs /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><HContact /></MainLayout>} />
        <Route path="/school" element={<MainLayout><DaySchoolM /></MainLayout>} />
        <Route path="/news" element={<MainLayout><News /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
