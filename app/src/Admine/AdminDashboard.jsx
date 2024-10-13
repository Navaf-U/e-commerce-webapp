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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
    
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
      <div className="flex justify-evenly">
        <div>
          <h1>TOTAL USERS</h1>
          <p></p>
        </div>
        <div>
          <h1>TOTAL SALES</h1>
          <p></p>
        </div>
        <div>
          <h1>WEEKLY SALES</h1>
          <p></p>
        </div>
      </div>
      <Bar data={data} options={options} />
    </>
  );
};

export default AdminDashboard;
