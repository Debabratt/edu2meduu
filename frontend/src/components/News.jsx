import { useState } from "react";

const News = () => {
  const [selectedNews, setSelectedNews] = useState(null);

  const newsList = [
    {
      id: 1,
      title: "Breaking: AI Revolutionizing the Tech Industry",
      description: "Artificial Intelligence is reshaping the future of technology, improving efficiency and innovation.",
      image: "/aii.jpg",
      content: "Full article content about AI revolutionizing the tech industry...",
      moreContent: `Ayman AlRashed, Regional Vice President, IBM Saudi Arabia and Giovanni Di Filippo, President of EMEA, Lenovo, at LEAP 2025 in Riyadh. (Credit: IBM)

      “Today’s announcement represents an important step in the longstanding relationship between IBM and Lenovo,” said Giovanni Di Filippo, President of EMEA, Infrastructure Solutions Group at Lenovo. “We're pleased to deepen our partnership to bring IBM’s fit-for-purpose generative AI offerings together with Lenovo’s infrastructure solutions for both on-premises and cloud use to provide customers in Saudi Arabia with solutions designed to meet their unique needs in this fast-paced growing market.”

      Organizations in Saudi Arabia are currently able to access ALLaM through watsonx; use advanced AI capabilities to train, tune, and deploy ALLaM; and run their AI workloads on Lenovo infrastructure for both on-premises and cloud use cases. The new solutions are expected to provide additional ways for clients to harness the power of Generative AI with an approach based on transparency, trust, and choice.
      `,
    },
    {
      id: 2,
      title: "Stock Market Hits Record Highs",
      description: "The stock market reaches new highs as investors show confidence in economic growth.",
      image: "/stcok.jpg",
      content: "Full article content about stock market reaching new highs...",
      moreContent: `Ayman AlRashed, Regional Vice President, IBM Saudi Arabia and Giovanni Di Filippo, President of EMEA, Lenovo, at LEAP 2025 in Riyadh. (Credit: IBM)

      “Today’s announcement represents an important step in the longstanding relationship between IBM and Lenovo,” said Giovanni Di Filippo, President of EMEA, Infrastructure Solutions Group at Lenovo. “We're pleased to deepen our partnership to bring IBM’s fit-for-purpose generative AI offerings together with Lenovo’s infrastructure solutions for both on-premises and cloud use to provide customers in Saudi Arabia with solutions designed to meet their unique needs in this fast-paced growing market.”

      Organizations in Saudi Arabia are currently able to access ALLaM through watsonx; use advanced AI capabilities to train, tune, and deploy ALLaM; and run their AI workloads on Lenovo infrastructure for both on-premises and cloud use cases. The new solutions are expected to provide additional ways for clients to harness the power of Generative AI with an approach based on transparency, trust, and choice.
      `,
    },
    {
      id: 3,
      title: "New Innovations in Renewable Energy",
      description: "Scientists develop groundbreaking solar panels that are more efficient and sustainable.",
      image: "/ener.jpg",
      content: "Full article content about new innovations in renewable energy...",
    },
    {
      id: 4,
      title: "SpaceX Plans Mission to Mars",
      description: "Elon Musk's company is set to launch a crewed mission to Mars by 2030.",
      image: "/mars.jpg",
      content: "Full article content about SpaceX's mission to Mars...",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">
        Latest <span className="text-[#17A2B8]">News</span>
      </h1>

      {selectedNews ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img src={selectedNews.image} alt="News" className="w-full h-64 object-cover rounded-lg" />
          <h2 className="text-2xl font-bold mt-4">{selectedNews.title}</h2>
          <p className="text-gray-700 mt-2">{selectedNews.content}</p>
          {selectedNews.moreContent && <p className="text-gray-600 mt-4">{selectedNews.moreContent}</p>}
          <button
            onClick={() => setSelectedNews(null)}
            className="mt-4 text-[#17A2B8] hover:underline font-medium"
          >
            Back
          </button>
        </div>
      ) : (
        <>
          <div className="relative bg-white rounded-lg shadow-md overflow-hidden mb-12">
            <img
              src={newsList[0].image}
              alt="Featured News"
              className="w-full h-64 object-cover"
              onError={(e) => (e.target.src = '/default-image.png')}
            />
            <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-end p-6">
              <h2 className="text-white text-2xl font-bold">{newsList[0].title}</h2>
              <p className="text-gray-200 mt-2">{newsList[0].description}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {newsList.slice(1).map((news) => (
              <div
                key={news.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={news.image}
                  alt="News"
                  className="w-full h-40 object-cover rounded-lg"
                  onError={(e) => (e.target.src = '/default-image.png')}
                />
                <h3 className="text-xl font-semibold mt-4 text-gray-900">{news.title}</h3>
                <p className="text-gray-600 mt-2">{news.description}</p>
                <button
                  onClick={() => setSelectedNews(news)}
                  className="mt-4 text-[#17A2B8] hover:underline font-medium"
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default News;
