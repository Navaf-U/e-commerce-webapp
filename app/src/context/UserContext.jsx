import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const userData = createContext();

function UserContext({children}) {
    
    const [users,setUsers]=useState([])
    const [isLogged,setIsLogged]=useState(false)
    const [currUser,setCurrUser]=useState(null)

    useEffect(()=>{
        const userFetch = async () =>{
            try{
                const data = await axios.get("http://localhost:3000/allUsers")
            setUsers(data.data);
            }catch(err){
                console.log(err);
            }
        }
        userFetch()
    },[])

    const loginUser = (email,password) =>{
        const user = users.find((item)=>item.email === email && item.password === password )
        if(user){
            setIsLogged(true)
            setCurrUser(user)
            localStorage.setItem("isLogged",true)
            localStorage.setItem("currUser",JSON.stringify(user))
        }else{
            alert("invalid email or password")
        }
    }

    const logoutUser = ()=>{
        setIsLogged(false)
        setCurrUser(null)
        localStorage.removeItem("isLogged")
        localStorage.removeItem("currUser")
    }

    useEffect(()=>{
        const logged = localStorage.getItem("isLogged") === true;
        const saveLog=JSON.parse(localStorage.getItem("currUser"))

        if(logged && saveLog){
            setIsLogged(true)
            setCurrUser(saveLog)
        }
    },[])

    const value ={
        users,
        currUser,
        isLogged,
        loginUser,
        logoutUser
    }


  return (
    <div>
        <userData.Provider value={value}>
        {children}
        </userData.Provider>
    </div>
  )
}

export default UserContext
