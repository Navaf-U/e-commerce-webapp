import axios from "axios";
import ApexCharts from 'apexcharts';
import Loading from "../Components/Loading/Loading";
import { useContext, useEffect, useState, useRef } from "react";
import { userData } from "../context/UserContext";
import { ProductsData } from "../context/ProductsCont";

const AdminDashboard = () => {
  const [usersSale, setUsersSale] = useState(null);
  const { setLoading, loading} = useContext(userData);
  const { products } = useContext(ProductsData);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:4000/allUsers");
        setUsersSale(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading]);

  useEffect(() => {
    if (usersSale && products && chartRef.current) {
      const options = {
        series: [
          usersSale.length,           
          products.length,            
          61,
          90              
        ],
        chart: {
          height: 390,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
            },
            dataLabels: {
              name: { show: false },
              value: { show: false },
            },
            barLabels: {
              enabled: true,
              useSeriesColors: true,
              offsetX: -8,
              fontSize: '16px',
              formatter: function(seriesName, opts) {
                return seriesName + ": " + opts.w.globals.series[opts.seriesIndex];
              },
            },
          },
        },
        colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
        labels: ['Total Users', 'Total Products', 'Weekly Sales', 'Monthly Sales'],
        responsive: [{
          breakpoint: 480,
          options: {
            legend: { show: false },
          },
        }],
      };

      if (!chartInstance.current) {
        chartInstance.current = new ApexCharts(chartRef.current, options);
        chartInstance.current.render();
      } else {
        chartInstance.current.updateSeries(options.series);
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [usersSale, products]);

  return (
    <div className="flex flex-col md:flex-row justify-around items-center">
      <div className="pt-20">
      {loading ? <Loading /> : <div id="chart" ref={chartRef}></div>}
      </div>
      <div className="pt-20">
    <iframe className=" w-[400px] ms-1 h-[200px] md:w-[500px] md:h-[300px]  rounded-lg" src="https://www.chartbase.so/embed/8673b331-969e-4a51-8966-b7bc6d3e519e" ></iframe>
      </div>
    </div>
  );
};

export default AdminDashboard;
