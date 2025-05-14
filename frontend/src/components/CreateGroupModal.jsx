import { useState } from "react";
import { IoClose } from "react-icons/io5";
import convertToBase64 from "../utils/convertToBase64";


const CreateGroupModal = ({ users, currentUserId, onCreateGroup, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [adminId, setAdminId] = useState(currentUserId);
  const [file, setFile] = useState(null);
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState("");

  const handleCheckboxChange = (userId) => {
    console.log(userId)
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };
 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGroupImage(URL.createObjectURL(file));
      setFile(file)

    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!groupName || selectedUsers.length === 0) {
      alert("Please enter a group name, description, and select users.");
      return;
    }
    const fileBase64 = await convertToBase64(file);

    onCreateGroup({
      name: groupName,
      users: [...selectedUsers, currentUserId], // Add self by default
      admin: adminId,
      isGroupChat: true,
      file:fileBase64,
      description: groupDescription,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-2xl w-[90%] sm:w-[420px] shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Create New Group</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Group Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Awesome Devs 👨‍💻"
              required
            />
          </div>

          {/* Group Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Image (Optional)
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {groupImage && (
              <div className="mt-3">
                <img
                  src={groupImage}
                  alt="Group Preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Group Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Description
            </label>
            <textarea
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your group..."
            />
          </div>

          {/* Select Members */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Members
            </label>
            <div className="max-h-40 overflow-y-auto border rounded-lg p-2 space-y-2">
              {users
                .filter((u) => u._id !== currentUserId)
                .map((user) => (
                  <label key={user._id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleCheckboxChange(user._id)}
                      className="form-checkbox"
                    />
                    <img
                      src={`http://localhost:3000/${user.profileImg}` || `https://ui-avatars.com/api/?name=${user.name}`}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm">{user.name}</span>
                  </label>
                ))}
            </div>
          </div>

          {/* Admin Selector - Fixed as You */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Admin
            </label>
            <div className="flex items-center gap-3 mt-1">
              <input
                type="checkbox"
                checked
                disabled
                className="form-checkbox"
              />
              <img
                src={`https://ui-avatars.com/api/?name=You`}
                alt="You"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-semibold">You (Group Creator)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
