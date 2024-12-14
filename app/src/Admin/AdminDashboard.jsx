import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import axiosErrorManager from '../util/axiosErrorManage';
import { toast } from 'react-toastify';
import axiosInstance from '../util/axiosInstance';

// Register necessary Chart.js components
ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/users");
        const userData = data.users.filter((item) => item.isBlocked === false);
        setUsers(userData.length);
      } catch (err) {
        toast.error(axiosErrorManager(err));
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/products");
        const productData = data.data.filter((item) => item.isDeleted === false);
        setProducts(productData.length);
      } catch (err) {
        toast.error(axiosErrorManager(err));
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/orders/total");
        setOrders(data.data);
        const res = await axiosInstance.get("/admin/orders/stats");
        setTotalAmount(res.data.data.totalRevenue);
        console.log(res.data.data.totalRevenue)
        
      } catch (err) {
        toast.error(axiosErrorManager(err));
      }
    };
    fetchOrder();
  }, []);

  const labels = ['Users', 'Products', 'Orders', 'Revenue'];
  const data = {
    labels: labels,
    datasets: [
      {
        type: 'bar',
        label: 'Users',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        data: [users, 0, 0, 0],
        yAxisID: 'y1',
      },
      {
        type: 'bar',
        label: 'Products',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
        data: [0, products, 0, 0],
        yAxisID: 'y1',
      },
      {
        type: 'bar',
        label: 'Orders',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
        data: [0, 0, orders, 0],
        yAxisID: 'y1',
      },
      {
        type: 'bar',
        label: 'Revenue',
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgb(255, 206, 86)',
        borderWidth: 1,
        data: [0, 0, 0, totalAmount || 0],
        yAxisID: 'y2', 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y1: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Count (Users, Products, Orders)',
        },
      },
      y2: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Revenue',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row justify-around items-center">
      <div className="w-full h-screen">
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
};

export default AdminDashboard;
