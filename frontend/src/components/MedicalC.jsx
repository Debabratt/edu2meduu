import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Nursing Homes Data
const nursingHomes = [
  { name: "Greenwood Nursing Home", address: "123 Green St, Cityville", medicalInfo: "24/7 care, Physical Therapy, Assisted Living", imgSrc: "/nur1.webp" },
  { name: "Sunrise Care Facility", address: "456 Sunshine Rd, Townsville", medicalInfo: "Memory care, Medical monitoring, Rehabilitation", imgSrc: "/nur2.webp" },
  { name: "Oak Tree Senior Care", address: "789 Oak Ave, Woodstown", medicalInfo: "Hospice care, Nutritional support, Physical Therapy", imgSrc: "/nur3.webp" },
];

// Government Medical Facilities Data
const govtMedical = [
  { name: "City Government Hospital", address: "123 City Center, Metropolis", medicalInfo: "Emergency services, Free treatment, Government-funded", imgSrc: "/govt1.jpg" },
  { name: "State Medical Center", address: "456 State Rd, Capitol City", medicalInfo: "Affordable medical care, Specialist services, Public health initiatives", imgSrc: "/govt2.jpg" },
  { name: "Public Health Clinic", address: "789 Health Ave, National Town", medicalInfo: "General healthcare, Vaccinations, Low-cost services", imgSrc: "/govt3.jpg" },
];

// Private Medical Facilities Data
const privateMedical = [
  { name: "Sum Hospitals", address: "Bharatpur", medicalInfo: "Specialized treatments, Luxury healthcare, Private rooms", imgSrc: "/ph2.png" },
  { name: "Blue Wheel Hospital", address: "Blue Wheel Hospital Mancheswar Industrial Estate", medicalInfo: "Exclusive services, Advanced treatments, Personal care", imgSrc: "/ph3.png" },
  { name: "MedCare Private Center", address: "303 MedCare St, PrivateVille", medicalInfo: "Private consultations, Customized healthcare plans", imgSrc: "/pvth.webp" },
];

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

function MedicalC(){
  return (
    <>
      {/* Nursing Homes Carousel */}
      <div className="bg-gray-100 p-8 mt-5">
        <header className="mb-8">
          <h1 className="h text-3xl font-bold text-gray-800 text-left pl-4 lg:pl-16">Nursing Homes</h1>
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
            {nursingHomes.map((home, index) => (
              <div key={index} className="relative bg-white rounded-lg shadow-lg mx-2 md:mx-4 h-60">
                <div className="relative h-full">
                  <img 
                    src={home.imgSrc} 
                    alt={home.name} 
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black bg-opacity-50 rounded-b-xl">
                    <h2 className="text-white text-lg font-semibold">{home.name}</h2>
                    <p className="text-white text-sm">{home.address}</p>
                    <p className="text-white text-sm mt-2">{home.medicalInfo}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </main>
      </div>

      {/* Government Medical Facilities Carousel */}
      <div className="bg-gray-100 p-8 mt-5">
        <header className="mb-8">
          <h1 className="h text-3xl font-bold text-gray-800 text-left pl-4 lg:pl-16"> Hospitals</h1>
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
            {govtMedical.map((facility, index) => (
              <div key={index} className="relative bg-white rounded-lg shadow-lg mx-2 md:mx-4 h-60">
                <div className="relative h-full">
                  <img 
                    src={facility.imgSrc} 
                    alt={facility.name} 
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black bg-opacity-50 rounded-b-xl">
                    <h2 className="text-white text-lg font-semibold">{facility.name}</h2>
                    <p className="text-white text-sm">{facility.address}</p>
                    <p className="text-white text-sm mt-2">{facility.medicalInfo}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </main>
      </div>

      {/* Private Medical Facilities Carousel */}
      <div className="bg-gray-100 p-8 mt-5">
        <header className="mb-8">
          <h1 className="h text-3xl font-bold text-gray-800 text-left pl-4 lg:pl-16"> Private Clinics </h1>
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
            {privateMedical.map((facility, index) => (
              <div key={index} className="relative bg-white rounded-lg shadow-lg mx-2 md:mx-4 h-60">
                <div className="relative h-full">
                  <img 
                    src={facility.imgSrc} 
                    alt={facility.name} 
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black bg-opacity-50 rounded-b-xl">
                    <h2 className="text-white text-lg font-semibold">{facility.name}</h2>
                    <p className="text-white text-sm">{facility.address}</p>
                    <p className="text-white text-sm mt-2">{facility.medicalInfo}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </main>
      </div>
    </>
  );
}

export default MedicalC ;
