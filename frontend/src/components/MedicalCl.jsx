import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

function MedicalCl() {
  const [hospital, setDaySchools] = useState([]);
  const [privateclinics, setPlaySchools] = useState([]);
  const [boardingSchools, setBoardingSchools] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/user/getallcategories')
      .then(response => {
        const hospitals = response.data.filter(cat => cat.categoryType === 'Hospital');
        const clinics = response.data.filter(cat => cat.categoryType === 'Private Clinic');
        const medicine = response.data.filter(cat => cat.categoryType === 'Medical Stores');
        setDaySchools(hospitals);
        setPlaySchools(clinics);
        setBoardingSchools(medicine);
      })
      .catch(error => console.error("Error fetching categories", error));
  }, []);

  const renderCarousel = (title, items) => (
    <div className="bg-gray-100 p-8 mt-33">
      <header className="mb-8">
        <h1 className="h text-3xl font-bold text-gray-800 text-left pl-4 lg:pl-16">{title}</h1>
      </header>
      <main className="px-4 md:px-8 lg:px-16 py-5">
        <Carousel 
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          showDots={false}
          arrows={false}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {items.map((school, index) => (
            <div key={index} className="relative bg-white rounded-lg shadow-lg mx-2 md:mx-4 h-60">
              <div className="relative h-full">
              <img 
  src={`http://localhost:8001/${school.image}`} 
  alt={school.name} 
  className="w-full h-full object-cover rounded-t-xl"
/>
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black bg-opacity-50 rounded-b-xl">
                  <h2 className="text-white text-lg font-semibold">{school.name}</h2>
                  <p className="text-white text-sm">{school.ctitle}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </main>
    </div>
  );

  return (
    <>
      {renderCarousel("Hospital", hospital)}
      {renderCarousel("Private Clinic", privateclinics)}
      {renderCarousel("Medical Stores", boardingSchools)}
    </>
  );
}

export default MedicalCl;
