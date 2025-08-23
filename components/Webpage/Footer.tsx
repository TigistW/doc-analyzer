import React from "react";
import { FaTwitter, FaDribbble, FaLinkedin } from "react-icons/fa";
import { IconType } from "react-icons";



const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Links
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <a href="#" className="hover:underline">Home</a>
              </li>
              <li>
                <a href="#contactus" className="hover:underline">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Resources
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-700 hover:bg-gray-200 w-max"
              >
                Email ↗
              </a>
              <a
                href="#"
                className="px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-700 hover:bg-gray-200 w-max"
              >
                Feedback ↗
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          {/* Left */}
          <div className="flex gap-4 mb-4 md:mb-0">
            <a href="#" className="hover:underline">Terms & Conditions</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>

          {/* Center: Social Icons */}
       <div className="flex justify-center gap-6">
            <a href="#"><FaTwitter size={20} /></a>
            <a href="#"><FaLinkedin size={20} /></a>
            <a href="#"><FaDribbble size={20} /></a>
            </div>

          {/* Right */}
          <p>©2025 eAMR Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
