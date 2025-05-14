import { useState, useRef, useEffect } from "react";

const ProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(user.isProfileOpen);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <img
        src={`http://localhost:3000/${user.profilePic}`}
        alt="User"
        className="w-10 h-10 rounded-full object-cover cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
          <div className="flex flex-col items-center p-4">
            <img
              src={`http://localhost:3000/${user.profilePic}`}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.status}</p>
          </div>
          <div className="border-t px-4 py-2 text-sm text-gray-700">
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileDropdown;