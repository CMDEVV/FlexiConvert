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
import Footer from "./Footer";

type SidebarProps = {
  mainContent: React.ReactNode;
};

export default function Sidebar({ mainContent }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({});

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (menu: string) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu] || false,
    }));
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const navigationItems = [
    {
      title: "Tools",
      items: [
        { id: 1, name: "Custom" },
        { id: 2, name: "Png to Jpeg" },
        { id: 3, name: "Jpeg to Png" },
      ],
    },
  ];

  return (
    <div className="flex">
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold">FlexiConvertIt</span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white w-64 flex flex-col justify-between transform ${
          isOpen || isLargeScreen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div>
          <div className="p-4 text-lg font-bold mt-10"></div>
          <nav className="mt-4 space-y-2 px-4 rounded">
            <Link href="/">
              <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100">
                Home
              </button>
            </Link>

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
                    }`}
                  />
                </button>
                {dropdownOpen[item.title] && (
                  <div className="mt-2 ml-6 space-y-2">
                    {item.items.map((subItem) => (
                      <Link key={subItem.id} href={`/detail/${subItem.id}`}>
                        <button className="w-full text-left p-2 rounded hover:bg-gray-100 transition-colors">
                          {subItem.name}
                        </button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Footer pinned at bottom */}
        <div className="p-4">
          <Footer />
        </div>
      </div>

      {/* Toggle Button (Mobile) */}
      {!isLargeScreen && (
        <div
          className="fixed top-4 right-4 z-50 p-2 text-black rounded-full focus:outline-none"
          onClick={toggleSidebar}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </div>
      )}

      {/* Main Content */}
      <div
        className={`mt-20 flex-1 p-6 transition-all duration-300 ${
          isOpen || isLargeScreen ? "ml-64" : "ml-0"
        }`}
      >
        {mainContent}
      </div>
    </div>
  );
}
