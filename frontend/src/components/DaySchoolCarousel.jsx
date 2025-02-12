
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const daySchoolItems = [
  { name: "Greenwood High", address: "123 Green St, Cityville", imgSrc: "/d1.jpg" },
  { name: "Sunrise Academy", address: "456 Sunshine Rd, Townsville", imgSrc: "/cat1.jpg" },
  { name: "Oak Tree School", address: "789 Oak Ave, Woodstown", imgSrc: "/cat2.jpg" },
  { name: "Riverdale Academy", address: "101 River Rd, Rivertown", imgSrc: "/b1.jpg" },
  { name: "Mountain View School", address: "202 Mountain Dr, Hillside", imgSrc: "/cat1.jpg" },
  { name: "Blue Sky Academy", address: "303 Blue Sky Blvd, Sky City", imgSrc: "/cat2.jpg" },

];
const daySchoolItems1 = [
  { name: "Greenwood High", address: "123 Green St, Cityville", imgSrc: "/p1.jpg" },
  { name: "Sunrise Academy", address: "456 Sunshine Rd, Townsville", imgSrc: "/p2.jpg" },
  { name: "Oak Tree School", address: "789 Oak Ave, Woodstown", imgSrc: "/p3.jpg" },
  { name: "Riverdale Academy", address: "101 River Rd, Rivertown", imgSrc: "/p4.jpg" },
  { name: "Mountain View School", address: "202 Mountain Dr, Hillside", imgSrc: "/p5.jpg" },
  { name: "Blue Sky Academy", address: "303 Blue Sky Blvd, Sky City", imgSrc: "/b1.jpg" },

];
const daySchoolItems2 = [
  { name: "Greenwood High", address: "123 Green St, Cityville", imgSrc: "/b3.jpg" },
  { name: "Sunrise Academy", address: "456 Sunshine Rd, Townsville", imgSrc: "/b4.jpg" },
  { name: "Oak Tree School", address: "789 Oak Ave, Woodstown", imgSrc: "/b2.jpg" },
  { name: "Riverdale Academy", address: "101 River Rd, Rivertown", imgSrc: "/b3.jpg" },

  { name: "Blue Sky Academy", address: "303 Blue Sky Blvd, Sky City", imgSrc: "/b1.jpg" },

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

function DaySchoolCarousel() {
  return (
    <>
    <div className="bg-gray-100 p-8 mt-5">
      <header className="mb-8">
        <h1 className=" h text-3xl font-bold text-gray-800 text-left pl-4 lg:pl-16">Day Schools</h1>
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
          {daySchoolItems.map((school, index) => (
            <div key={index} className="relative bg-white rounded-lg shadow-lg mx-2 md:mx-4 h-60">
            
              <div className="relative h-full">
                <img 
                  src={school.imgSrc} 
                  alt={school.name} 
                  className="w-full h-full object-cover rounded-t-xl"
                />
                
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black bg-opacity-50 rounded-b-xl">
                  <h2 className="text-white text-lg font-semibold">{school.name}</h2>
                  <p className="text-white text-sm">{school.address}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </main>
    </div>
    <div className="bg-gray-100 p-8 mt-5">
      <header className="mb-8">
        <h1 className=" h text-3xl font-bold text-gray-800 text-left pl-4 lg:pl-16">Play Schools</h1>
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
          {daySchoolItems1.map((school, index) => (
            <div key={index} className="relative bg-white rounded-lg shadow-lg mx-2 md:mx-4 h-60">
            
              <div className="relative h-full">
                <img 
                  src={school.imgSrc} 
                  alt={school.name} 
                  className="w-full h-full object-cover rounded-t-xl"
                />
                
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black bg-opacity-50 rounded-b-xl">
                  <h2 className="text-white text-lg font-semibold">{school.name}</h2>
                  <p className="text-white text-sm">{school.address}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </main>
    </div>
    
    <div className="bg-gray-100 p-8 mt-5">
      <header className="mb-8">
        <h1 className="h text-3xl font-bold text-gray-800 text-left pl-4 lg:pl-16">Boarding Schools</h1>
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
          {daySchoolItems2.map((school, index) => (
            <div key={index} className="relative bg-white rounded-lg shadow-lg mx-2 md:mx-4 h-60">
         
              <div className="relative h-full">
                <img 
                  src={school.imgSrc} 
                  alt={school.name} 
                  className="w-full h-full object-cover rounded-t-xl"
                />
              
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black bg-opacity-50 rounded-b-xl">
                  <h2 className="text-white text-lg font-semibold">{school.name}</h2>
                  <p className="text-white text-sm">{school.address}</p>
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

export default DaySchoolCarousel;
