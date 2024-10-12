import { useContext, useState } from "react";
import { userData } from "../context/UserContext";
import axios from "axios";

function UserProfile() {
  const { currUser, setCurrUser } = useContext(userData);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateUserProfile = async (updatedUser) => {
    try {
      setLoading(true);
      await axios.patch(`http://localhost:3000/allUsers/${currUser.id}`, updatedUser);
      setCurrUser(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedUser = { ...currUser, image };
    await updateUserProfile(updatedUser);
  };

  return (
    <div className="flex flex-col items-center p-4">
      {currUser && (
        <>
          <img src={currUser.image} className="w-28 h-auto rounded-full mb-4" alt="Profile" />
          <p className="text-lg font-semibold">{currUser.name}</p>
          
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-4 mb-2 border-none outline-none ring-0 rounded p-2"
          />
          <button
            onClick={handleSave}
            disabled={loading}
            className={`mt-2 w-[50%] h-10 text-white bg-[#BF3131] hover:bg-[#612020aa] rounded`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
