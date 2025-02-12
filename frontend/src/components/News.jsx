const News = () => {
  const newsList = [
    {
      id: 1,
      title: "Breaking: AI Revolutionizing the Tech Industry",
      description: "Artificial Intelligence is reshaping the future of technology, improving efficiency and innovation.",
      image: "/aii.jpg", // Ensure this image is in the public folder
    },
    {
      id: 2,
      title: "Stock Market Hits Record Highs",
      description: "The stock market reaches new highs as investors show confidence in economic growth.",
      image: "/stcok.jpg", // Ensure this image is in the public folder
    },
    {
      id: 3,
      title: "New Innovations in Renewable Energy",
      description: "Scientists develop groundbreaking solar panels that are more efficient and sustainable.",
      image: "/ener.jpg",
    },
    {
      id: 4,
      title: "SpaceX Plans Mission to Mars",
      description: "Elon Musk's company is set to launch a crewed mission to Mars by 2030.",
      image: "/mars.jpg",
    },
  ];

  return (
    <div>
      {/* Fixed Header Section */}
      <div className="fixed top-0 left-0 right-0 bg-white py-12 px-6 z-10 lg:mt-20 sm:mt-10">
      </div>
      <div className="max-w-6xl lg:mt-45 sm:mt-50 mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">
          Latest <span className="text-[#17A2B8]">News</span>
        </h1>
      </div>

      {/* Content Below */}
      <div className="max-w-6xl mx-auto mt-32">
        <div className="relative bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <img
            src={newsList[0].image}
            alt="Featured News"
            className="w-full h-64 object-cover"
            onError={(e) => (e.target.src = '/default-image.png')} // Optional: fallback image
          />
          <div className="absolute inset-0  bg-opacity-50 flex flex-col justify-end p-6">
            <h2 className="text-white text-2xl font-bold">{newsList[0].title}</h2>
            <p className="text-gray-200 mt-2">{newsList[0].description}</p>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 lg:mb-17 gap-6">
          {newsList.slice(1).map((news) => (
            <div key={news.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <img
                src={news.image}
                alt="News"
                className="w-full h-40 object-cover rounded-lg"
                onError={(e) => (e.target.src = '/default-image.png')} // Optional: fallback image
              />
              <h3 className="text-xl font-semibold mt-4 text-gray-900">{news.title}</h3>
              <p className="text-gray-600 mt-2">{news.description}</p>
              <button className="mt-4 text-[#17A2B8] hover:underline font-medium">Read More</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
