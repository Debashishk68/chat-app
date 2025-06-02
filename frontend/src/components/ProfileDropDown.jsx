import React, { useEffect, useRef } from "react";
import { Video, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProfileDropdown = ({ isOpen, onClose ,data}) => {
  const dropdownRef = useRef(null);

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.25 }}
          className="absolute z-50 top-8 right-10 w-96 rounded-2xl bg-white text-gray-800 shadow-2xl border border-gray-200"
        >
          <main className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"
                style={{
                  backgroundImage: `url(http://localhost:3000/${data.userPic})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              
              />
              <h2 className="text-lg font-semibold">{data.userName}</h2>

              <div className="flex gap-4 mt-4">
                <button className="bg-[#fe4b09] text-white px-4 py-2 rounded flex items-center gap-2 hover:opacity-90">
                  <Video size={16} /> Video
                </button>
                <button className="bg-[#fe4b09] text-white px-4 py-2 rounded flex items-center gap-2 hover:opacity-90">
                  <Phone size={16} /> Voice
                </button>
              </div>

              <div className="mt-6 text-left w-full max-w-md">
                <p className="text-sm text-gray-500 mb-1">About</p>
                <p className="mb-4">🌟 Just living life.</p>

                <p className="text-sm text-gray-500 mb-1">Phone number</p>
                <p className="mb-4">+91 98355 46706</p>
              </div>
            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileDropdown;
