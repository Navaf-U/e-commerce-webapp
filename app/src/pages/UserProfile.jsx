import axios from "axios";
import { useContext, useState } from "react";
import { userData } from "../context/UserContext";

function UserProfile() {
  const { currUser, setCurrUser } = useContext(userData);
  const [image, setImage] = useState(currUser?.image || "");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageReader = new FileReader();
      imageReader.onloadend = () => {
        setImage(imageReader.result);
      };
      imageReader.readAsDataURL(file);
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

  const removePfp = async () => {
    const updatedUser = { ...currUser, image: "" }; 
    setImage("");
    await updateUserProfile(updatedUser);
  };

  return (
    <div className="flex flex-col items-center p-4">
      {currUser && (
        <>
          {image ? (
            <img src={image} className="w-36 h-[150px] rounded-full mb-4" alt={currUser.name} />
          ) : (
            <div className="w-28 h-28 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
              <span>No Photo</span>
            </div>
          )}
          <p className="text-lg font-semibold">{currUser.name}</p>

          <input
            type="file"
            onChange={handleFileChange}
            className="mt-4 mb-2 border-none outline-none ring-0 rounded p-2"
          />
          <button
            onClick={handleSave}
            disabled={loading}
            className={`mt-2 w-[50%] h-10 text-white bg-[#2aacd8] hover:bg-[#2d84a1] rounded`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={removePfp}
            disabled={loading}
            className={`mt-2 w-[50%] h-10 text-white bg-[#BF3131] hover:bg-[#612020] rounded`}
          >
            {loading ? "Removing..." : "Remove Photo"}
          </button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
