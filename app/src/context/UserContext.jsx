import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const userData = createContext();

function UserContext({children}) {
    
    const [users,setUsers]=useState([])
    const [isLogged,setIsLogged]=useState(false)
    const [currUser,setCurrUser]=useState(null)
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        const userFetch = async () =>{
            try{
                setLoading(true)
                const data = await axios.get("http://localhost:3000/allUsers")
            setUsers(data.data);
            }catch(err){
                console.log(err);
            }finally{
                setLoading(false)
 }
        }
        userFetch()
    },[])

    const loginUser = (email,password) =>{
        const user = users.find((item)=>item.email === email && item.password === password )
        if(user){
            setIsLogged(true)
            setCurrUser(user)
            localStorage.setItem("isLogged","true")
            localStorage.setItem("currUser",JSON.stringify(user))
            const storedCart = JSON.parse(localStorage.getItem(`${user.email}_=cart`)) || {};
            localStorage.setItem("cart", JSON.stringify(storedCart));
            alert("user logged")
        }else{
            alert("invalid email or password")
        }
    }

    const logoutUser = ()=>{
        setIsLogged(false)
        setCurrUser(null)
        localStorage.removeItem("isLogged")
        localStorage.removeItem("currUser")
        localStorage.removeItem("cart")
    }

    useEffect(()=>{
        const logged = localStorage.getItem("isLogged") === "true";
        const saveLog=JSON.parse(localStorage.getItem("currUser"))

        if(logged && saveLog){
            setIsLogged(true)
            setCurrUser(saveLog)
        }
    },[])



 const PostUserDatas = (name,email,password,cart)=>{
    const data = {
      name:name,
      email:email,
      password:password,
      cart:cart,


    }
        const postData = async()=>{
           try{
            setLoading(true)
             await axios.post("http://localhost:3000/allUsers",data);

           }catch(error){
            console.log(error);
           }finally{
            setLoading(false)
           }
        }
        postData()
    }
 


    const value ={
        users,
        currUser,
        isLogged,
        loginUser,
        logoutUser,
        PostUserDatas,
        loading
    };


  return (
    <div>
        <userData.Provider value={value}>
        {children}
        </userData.Provider>
    </div>
 
);
}
export default UserContext
