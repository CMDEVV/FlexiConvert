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

import Link from "next/link";

export default function NewSidebar({ mainContent }) {
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

  const navigationItems = [
    {
      title: "Tools",
      items: ["Png to Jpeg", "Jpeg to Png"],
    },
  ];

  return (
    <div className="flex">
      <header className="bg-white shadow-md fixed w-full z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
                alt="Logo"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-xl font-bold">FlexiConvert</span>
            </div>
          </div>
          {/* <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
              alt="User"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
          </div> */}
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white  w-64 transform ${
          isOpen || isLargeScreen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 text-lg font-bold">My Sidebar</div>
        <nav className="mt-4 space-y-2 px-4 rounded">
          {/* Home */}

          <Link href="/">
            <button className=" w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100">
              Home
            </button>
          </Link>

          {/*(Dropdown) */}
          {navigationItems.map((item) => (
            <div key={item.title}>
              <button
                onClick={() => toggleDropdown(item.title)}
                className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                  dropdownOpen[item.title] ? "bg-gray-100" : ""
                }`}
              >
                {item.title}

                <FiChevronDown
                  className={`transition-transform ${
                    dropdownOpen[item.title] ? "rotate-180" : ""
                  } `}
                />
              </button>
              {dropdownOpen[item.title] && (
                <div className="mt-2 ml-6 space-y-2">
                  {item.items.map((subItem) => (
                    <button
                      key={subItem}
                      className="w-full text-left p-2 rounded hover:bg-gray-100 transition-colors"
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
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
        className={`mt-20 flex-1 p-6 transition-all duration-300 ${
          isOpen || isLargeScreen ? "ml-64" : "ml-0"
        }`}
      >
        {mainContent}
        {/* <h1 className="text-2xl font-bold">Main Content Area</h1>
        <p className="mt-4 text-gray-600">
          This is the main content of the page. Adjust the sidebar and dropdowns
          to see how they work.
        </p> */}
      </div>
    </div>
  );
}
