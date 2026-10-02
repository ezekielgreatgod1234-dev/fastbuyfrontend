import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const token = Cookies.get("token");
  const [foodItems, setFoodItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fastbuybackend.onrender.com/product");
      setFoodItems(response.data.products);
      console.log(response)
    } catch (error) {
      console.log(error.response?.data?.message || error.message || "Something went wrong");
    }
  };
  fetchProducts();
}, []);

  
  const handleOrder = async (id) => {
    if (!token){
      navigate("/login")
      return
    }
    try {
      const response = await axios.post(
        "https://fastbuybackend.onrender.com/pay/initialize",
        {
          productId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      
  console.log(response.data.data.authorization_url);
    window.location.assign(response.data.data.authorization_url)
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* Header */}

      {/* Hero Section */}
      <section className="bg-linear-to-r from-emerald-600 to-teal-600 text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Get affordable foods here
          </h2>
          <p className="text-lg md:text-xl text-emerald-100 max-w-xl mx-auto font-light">
            Delicious, budget-friendly meals delivered straight to your doorstep
            fast and fresh.
          </p>
          <div className="pt-4">
            <Link
              to={token ? "/" : "/login"}
              className="inline-block bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-full shadow-md transition-transform transform hover:-translate-y-0.5 cursor-pointer no-underline"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Food Display Section */}
      <main
        id="food-section"
        className="grow max-w-7xl w-full mx-auto px-6 py-12 scroll-mt-20"
      >
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold tracking-tight text-gray-800">
            All Foods
          </h3>
          <span className="text-sm text-gray-500 font-medium">
            {foodItems.length} items available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {foodItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >

              <div className ="h-50">
                <img src={item.image} />
                </div>
             
              <div className="bg-white p-5 flex flex-col grow">
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h4 className="font-bold text-lg text-gray-800 mb-2">
                  {item.name}
                </h4>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="font-extrabold text-gray-900 text-lg">
                    {item.price}
                  </span>
                  <button
                    onClick={()=>handleOrder(item.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm cursor-pointer"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
