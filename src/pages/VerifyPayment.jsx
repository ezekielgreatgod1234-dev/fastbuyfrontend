import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const confirmPayment = async () => {
      try {
       
        const payment = await axios.get(
          `https://fastbuybackend.onrender.com/pay/verify/${reference}`
        );

        setStatus(payment.data.data.status);
        console.log(payment.data);
      } catch (error) {
        console.log(error.response?.data || "Something went wrong");
        setStatus("failed");
      }
    };

    if (reference) {
      confirmPayment();
    }
  }, [reference]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      {status === "loading" && (
        <>
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <h1 className="text-xl font-semibold">Loading...</h1>
        </>
      )}

      {status === "success" && (
        <>
          <h1 className="text-2xl font-bold text-green-600">
            Your payment was successful 
          </h1>

          <Link to="/">
            <button className="py-2 px-4 text-black border border-gray-900 rounded-md text-xl">
              Go to Home Page
            </button>
          </Link>
        </>
      )}

      {status === "failed" && (
        <>
          <h1 className="text-2xl font-bold text-red-600">
            Payment verification failed 
          </h1>

          <Link to="/">
            <button className="py-2 px-4 text-black border border-gray-900 rounded-md text-xl">
              Go to Home Page
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default VerifyPayment;