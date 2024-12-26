"use client";

import HomeContent from "@/components/HomeContent";
import { useState } from "react";
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

const TestSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const navigationItems = [
    // {
    //   title: "Home",
    //   icon: <FiHome className="w-5 h-5" />,
    //   items: [""],
    // },
    {
      title: "Tools",
      icon: <FiBox className="w-5 h-5" />,
      items: ["Png to Jpeg", "Jpeg to Png"],
    },
    // {
    //   title: "Settings",
    //   icon: <FiSettings className="w-5 h-5" />,
    //   items: ["Profile", "Account", "Preferences"],
    // },
    // {
    //   title: "Users",
    //   icon: <FiUser className="w-5 h-5" />,
    //   items: ["Team", "Permissions", "Roles"],
    // },
    // {
    //   title: "Messages",
    //   icon: <FiMail className="w-5 h-5" />,
    //   items: ["Inbox", "Sent", "Drafts"],
    // },
  ];

  const toggleDropdown = (title: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              {isSidebarOpen ? (
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

      {/* Sidebar and Content */}
      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 ${
            isSidebarOpen
              ? "w-64"
              : "w-0 -translate-x-full lg:translate-x-0 lg:w-20"
          } overflow-hidden z-20`}
        >
          <nav className="h-full py-4 px-4 py-2">
            <button
              className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                openDropdowns["Home"] ? "bg-gray-100" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <FiHome className="w-5 h-5" />
                <span>Home</span>
              </div>
            </button>

            {navigationItems.map((item) => (
              <div key={item.title} className="">
                <button
                  onClick={() => toggleDropdown(item.title)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                    openDropdowns[item.title] ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span className={`${!isSidebarOpen ? "lg:hidden" : ""}`}>
                      {item.title}
                    </span>
                  </div>
                  <FiChevronDown
                    className={`transition-transform ${
                      openDropdowns[item.title] ? "rotate-180" : ""
                    } ${!isSidebarOpen ? "lg:hidden" : ""}`}
                  />
                </button>
                {openDropdowns[item.title] && isSidebarOpen && (
                  <div className="mt-2 ml-6 space-y-2">
                    {item.items.map((subItem) => (
                      <button
                        key={subItem}
                        className="w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 p-6 transition-all duration-300 ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
          }`}
        >
          <HomeContent />
        </main>
      </div>
    </div>
  );
};

export default TestSidebar;
