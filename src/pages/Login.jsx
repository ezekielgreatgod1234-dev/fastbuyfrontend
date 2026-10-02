import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://fastbuybackend.onrender.com/auth/login",
        formData,
      );

      const data = response.data;
      Cookies.set("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* Form */}
      <main className="grow flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Log in to order your next meal.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className={inputClass}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-emerald-600 hover:text-emerald-700"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                autoComplete="current-password"
                required
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              {loading ? "Logging in..." : "Log in"}
              {!loading && <HiOutlineArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500 text-center">
            New to Fastbuy?{" "}
            <Link
              to="/register"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
