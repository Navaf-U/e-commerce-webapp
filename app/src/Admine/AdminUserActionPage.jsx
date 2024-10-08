import { useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { userData } from "../context/UserContext"
import { RiUser5Line } from "react-icons/ri";
import axios from "axios"

function AdminUserActionPage() {
    
    const {currUser} = useContext(userData)

    const {state} = useLocation() 
    let users = state?.item
    const navigates = useNavigate()

    
    const DeleteUser = async(userID) =>{
        if(!userID){
            console.log("NOT FOUND");

        }
            try{
                await axios.delete(`http://localhost:3000/allUsers/${userID}`)
                navigates("/admin")

            }catch(err){
                console.log(err);
                
            }
        
    }
    const BlockUser = async(Id) =>{
        if(!Id){
            console.log("USER ID NOT FOUND");
            return;
        }
            try{
                const {data} = await axios.get(`http://localhost:3000/allUsers/${Id}`)
                const updatedStatus = !data.isBlocked;
                await axios.patch(`http://localhost:3000/allUsers/${Id}`,{
                    isBlocked : updatedStatus})

            }catch(err){
                console.log("ERROR TO BLOCK USER",err);
                
            }
        
    }
    

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
        <RiUser5Line size={100}/>
        <h1>id: {users.id}</h1>
        <p>{users.name}</p>
        <p>{users.email}</p>
        <button onClick={()=>DeleteUser(users.id)} className="bg-red-600 w-32 h-10 rounded-2xl mt-10" >remove</button>
        <button onClick={()=>BlockUser(users.id)} className="bg-blue-700 w-32 h-10 rounded-2xl mt-10 hover:bg-slate-500 active:bg-orange-500">block</button>
    </div>
  )
}

export default AdminUserActionPage
