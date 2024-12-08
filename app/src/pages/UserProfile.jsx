import { useContext } from "react";
import { userData } from "../context/UserContext";

function UserProfile() {
  const { currUser} = useContext(userData);


  return (
    <div className="flex flex-col items-center p-4">
      {currUser && (
        <>
            <div className="w-28 h-28 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
              <span>No Photo</span>
            </div>
          <p className="text-lg font-semibold">{currUser.name}</p>
          <p className="text-lg font-semibold">{currUser.email}</p>
        </>
      )}
    </div>
  );
}

export default UserProfile;
