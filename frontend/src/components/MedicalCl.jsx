import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, slidesToSlide: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 },
};

const categories = [
  'Hospital',
  'Private Clinic',
  'Medical Stores',
];

function MedicalCl() {
  const [usersByCategory, setUsersByCategory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8001/user/getHealthcareUsers')
      .then((response) => {
        if (response.data.success && Array.isArray(response.data.users)) {
          const categorizedUsers = {};
          categories.forEach((category) => {
            categorizedUsers[category] = response.data.users.filter(
              (user) => user.category === category
            );
          });
          setUsersByCategory(categorizedUsers);
        } else {
          console.error('Invalid API response format:', response.data);
        }
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const renderCarousel = (title, users) => (
    <div key={title} className="bg-gray-50  py-12">
      <header className="mb-6 px-6 md:px-16">
        <h1 className="text-3xl font-extrabold text-gray-900 border-l-4 border-blue-500 pl-4">{title}</h1>
      </header>
      <main className="px-6 md:px-16">
        {users.length === 0 ? (
          <p className="text-center text-lg text-gray-500">Loading...</p>
        ) : (
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            showDots={false}
            arrows={false}
            containerClass="carousel-container"
            itemClass="carousel-item px-4"
          >
            {users.map((user) => (
              <div
                key={user._id}
                className="relative bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer overflow-hidden"
                onClick={() => navigate(`/medicalcategory/${user.category}`)}
              >
                <img
                  src={user.image }
                  alt={user.name}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent">
                  <h2 className="text-lg font-semibold text-white">{user.name || 'No Name Found'}</h2>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </main>
    </div>
  );

  return <>{categories.map((category) => renderCarousel(category, usersByCategory[category] || []))}</>;
}

export default MedicalCl;
