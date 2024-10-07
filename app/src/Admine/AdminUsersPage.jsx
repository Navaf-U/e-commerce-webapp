import { useContext, useEffect, useState } from "react"
import { userData } from "../context/UserContext"
import axios from "axios"

function AdminUsersPage() {
  const [users,setUsers] = useState([])
    const {currUser,setIsLogged} = useContext(userData)
  

    const DeleteUser = async(userID) =>{
        await axios.delete(`http://localhost:3000/allUsers/${userID}`)
        setUsers(users.filter((user)=>user.id === userID))
        setIsLogged(false)
    }


    useEffect(()=>{
        const fetchUser = async ()=>{
            const {data} = await axios.get("http://localhost:3000/allUsers")
            setUsers(data)
        }
        fetchUser()
    },[users,currUser])
        return (
    <div className="h-[100vh] overflow-scroll">
        <h1 className="text-[30px] font-[700]">
            Current User :
            {currUser.id} 
            {currUser.name} {currUser.email} {currUser.password}</h1>
        {users.map((item)=>{
            return (<div key={item.id}><li className="p-3">id : <span className="font-[600]">{item.id}</span> name: <span className="font-[600]">{item.name}</span> email: <span className="font-[600]">{item.email}</span> password: <span className="font-[600]">{item.password}</span></li><button className="bg-red-600" onClick={() => DeleteUser(item.id)}>Remove</button></div>
        )})}


    </div>
  )
}

export default AdminUsersPage
