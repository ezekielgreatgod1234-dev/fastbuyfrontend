import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
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
        "https://fastbuybackend.onrender.com/auth/register",
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
      {/* Header */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-black tracking-tight text-emerald-600 no-underline"
          >
            fastbuy
          </Link>
          <Link
            to="/login"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2 rounded-full transition-colors text-sm shadow-sm no-underline"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Form */}
      <main className="grow flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Sign up to order affordable meals delivered to your door.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jordan Lee"
                autoComplete="name"
                required
                className={inputClass}
              />
            </div>

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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                minLength={8}
                required
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              {loading ? "Creating account..." : "Create account"}
              {!loading && <HiOutlineArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="mt-6 text-xs text-gray-400 leading-relaxed text-center">
            By creating an account you agree to our{" "}
            <a href="#" className="text-emerald-600 hover:text-emerald-700">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-emerald-600 hover:text-emerald-700">
              Privacy Policy
            </a>
            .
          </p>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
