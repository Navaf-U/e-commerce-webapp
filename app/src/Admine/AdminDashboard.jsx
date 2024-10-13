import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { userData } from '../context/UserContext';
import { ProductsData } from "../context/ProductsCont";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [usersSale,setUsersSale] = useState("")
  const {setLoading} = useContext(userData)
  const {products} = useContext(ProductsData)

  useEffect(()=>{
    const fetchData = async () =>{
      setLoading(true)
      try{
        const {data} = await axios.get("http://localhost:3000/allUsers")
        setUsersSale(data)
      } catch(err){
        console.log(err);
        
      }finally{
        setLoading(false)
      }
    }
    fetchData()
  },[setLoading])
    
  const data = {
    labels: ["May", "June", "July", "Augest", "September", "October"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales",
      },
    },
  };

  return (
    <>
      <div className="flex justify-evenly mt-0.5">
        <div className="bg-[#BF3131] rounded-md w-56 text-center">
          <h1 className="font-[600] text-[16px] px-2 text-white shadow-lg">TOTAL USERS</h1>
          <p className="text-center text-white font-[700]">{usersSale.length}</p>
        </div>
        <div className="bg-blue-600 rounded-md w-56 text-center">
          <h1 className="font-[600] text-[16px] px-2 text-white shadow-lg">TOTAL PRODUCTS</h1>
          <p className="text-center text-white font-[700]">{products.length}</p>
        </div>
        <div className="bg-yellow-300 rounded-md w-56 text-center">
          <h1 className="font-[600] text-[16px] px-2 text-white shadow-lg">WEEKLY SALES</h1>
          <p className="text-center text-white font-[700]">80</p>
        </div>
        <div className="bg-lime-500 rounded-md w-56 text-center">
          <h1 className="font-[600] text-[16px] px-2 text-white shadow-lg">TOTAL SALES</h1>
          <p className="text-center text-white font-[700]">1640</p>
        </div>
      </div>
      <Bar data={data} options={options} />
    </>
  );
};

export default AdminDashboard;
