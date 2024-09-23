import React, { useEffect, useState } from "react";
import icon from '../assets/icon.png';
import { Link } from "react-scroll";
import { FaXmark, FaBars } from "react-icons/fa6";
import "../App.css"

// Extracted Modal Component
const AuthModal = ({ isModalOpen, closeModal, authForm, setAuthForm }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {authForm === "signup" ? "Sign up" : "Login"}
        </h2>

        {authForm === "signup" ? (
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <button className="bg-blue-500 text-white w-full py-2 rounded">Sign up</button>
            <p className="mt-4 text-center">
              Existing user?{" "}
              <a
                href="#"
                onClick={() => setAuthForm("login")}
                className="text-blue-500"
              >
                Login
              </a>
            </p>
          </div>
        ) : (
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <button className="bg-green-500 text-white w-full py-2 rounded">Login</button>
            <p className="mt-4 text-center">
              New user?{" "}
              <a
                href="#"
                onClick={() => setAuthForm("signup")}
                className="text-green-500"
              >
                Sign up
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuopen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authForm, setAuthForm] = useState("signup");

  const toggleMenu = () => {
    setIsMenuopen(!isMenuOpen);
  };

  const openModal = (formType) => {
    setAuthForm(formType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { link: "Home", path: "home" },
    { link: "Service", path: "service" },
    { link: "About", path: "about" },
    { link: "Product", path: "product" },
    { link: "Testimonial", path: "testimonial" },
    { link: "FAQ", path: "faq" },
  ];

  return (
    <header className="w-full bg-white md:bg-transparent fixed top-0 left-0 right-0">
      <nav className={`py-4 lg:px-14 px-4 ${isSticky ? "sticky top-0 left-0 right-0 border-b bg-white duration-300" : ""}`}>
        <div className="flex justify-between items-center text-base gap-8">
          <a href="/" className="text-2xl font-semibold flex items-center">
            <img src={icon} alt="logo" className="h-5" />
            <span className="text-[#263238]">NEXCENT</span>
          </a>

          {/* Nav items for large devices */}
          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <Link
                to={path}
                spy={true}
                smooth={true}
                offset={-100}
                key={path}
                className="block text-base text-gray-900 hover:text-brandPrimary first:font-medium"
              >
                {link}
              </Link>
            ))}
          </ul>

          {/* Login/Signup buttons for large devices */}
          <div className="space-x-12 hidden lg:flex items-center">
            <a
              href="#"
              onClick={() => openModal("login")}
              className="hidden lg:flex items-center text-brandPrimary hover:text-gray-900"
            >
              Login
            </a>
            <button
              onClick={() => openModal("signup")}
              className="bg-brandPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutralDGrey"
            >
              Sign up
            </button>
          </div>

          {/* Menu button for mobile devices */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-neutralDGrey focus:outline-none focus:text-gray-500"
            >
              {isMenuOpen ? <FaXmark className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Nav items for mobile devices */}
        <div className={`space-y-4 px-4 mt-16 py-7 bg-brandPrimary ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
          {navItems.map(({ link, path }) => (
            <Link
              to={path}
              spy={true}
              smooth={true}
              offset={-100}
              key={path}
              className="block text-base text-gray-900 hover:text-brandPrimary first:font-medium"
            >
              {link}
            </Link>
          ))}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        authForm={authForm}
        setAuthForm={setAuthForm}
      />
    </header>
  );
};

export default Navbar;
