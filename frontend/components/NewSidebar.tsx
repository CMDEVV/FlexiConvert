"use client";
import { useState, useEffect } from "react";
import {
  FiHome,
  FiSettings,
  FiUser,
  FiBox,
  FiMail,
  FiChevronDown,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function NewSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Toggle dropdowns
  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };
  // Check screen size and update `isLargeScreen`
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    // Initial check
    checkScreenSize();

    // Listen for resize events
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="flex">
      <header className="bg-white shadow-md fixed w-full z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              {isOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
            <div className="flex items-center space-x-2">
              <img
                src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
                alt="Logo"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-xl font-bold">FlexiConvert</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
              alt="User"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white  w-64 transform ${
          isOpen || isLargeScreen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 text-lg font-bold">My Sidebar</div>
        <ul className="mt-4 space-y-2 px-4 rounded">
          {/* Home */}
          <li className="px-4 py-2 hover:bg-gray-100 rounded">Home</li>

          {/* About (Dropdown) */}
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <div
              className="flex justify-between items-center"
              onClick={() => toggleDropdown("about")}
            >
              <span>About</span>
              <span>{dropdownOpen["about"] ? "▼" : "▶"}</span>
            </div>
            {dropdownOpen["about"] && (
              <ul className="ml-4 mt-2 space-y-1 text-sm">
                <li className="px-4 py-1 hover:bg-gray-600">Our Team</li>
                <li className="px-4 py-1 hover:bg-gray-600">Our History</li>
              </ul>
            )}
          </li>

          {/* Services (Dropdown) */}
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <div
              className="flex justify-between items-center"
              onClick={() => toggleDropdown("services")}
            >
              <span>Services</span>
              <span>{dropdownOpen["services"] ? "▼" : "▶"}</span>
            </div>
            {dropdownOpen["services"] && (
              <ul className="ml-4 mt-2 space-y-1 text-sm">
                <li className="px-4 py-1 hover:bg-gray-600">Web Development</li>
                <li className="px-4 py-1 hover:bg-gray-600">Mobile Apps</li>
                <li className="px-4 py-1 hover:bg-gray-600">SEO</li>
              </ul>
            )}
          </li>

          {/* Contact */}
          <li className="px-4 py-2 hover:bg-gray-700">Contact</li>
        </ul>
      </div>

      {/* Toggle Button */}
      {/* {!isLargeScreen && (
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-full focus:outline-none"
          onClick={toggleSidebar}
        >
          {isOpen ? "Close" : "Open"}
        </button>
      )} */}

      {/* Main Content */}
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isOpen || isLargeScreen ? "ml-64" : "ml-0"
        }`}
      >
        <h1 className="text-2xl font-bold">Main Content Area</h1>
        <p className="mt-4 text-gray-600">
          This is the main content of the page. Adjust the sidebar and dropdowns
          to see how they work.
        </p>
      </div>
    </div>
  );
}
