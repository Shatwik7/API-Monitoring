import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import fetchAPIchecks from '../services/apiChecks/fetchAPIChecks';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [activeOption, setActiveOption] = useState('monitor');
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeOption={activeOption} setActiveOption={setActiveOption} />

      {/* Content Area */}
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        {activeOption === 'monitor' && (
          <MonitorSection/>
        )}
        {activeOption !== 'monitor' && <div>{activeOption} section coming soon...</div>}
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ activeOption, setActiveOption }) => (
  <div className="w-full md:w-64 bg-gray-900 text-white p-6 flex flex-col">
    <h2 className="text-xl font-semibold mb-8">Dashboard</h2>
    <nav className="flex-1">
      <ul className="space-y-4">
        {['monitor', 'incident', 'reporting', 'alert settings', 'notifications', 'profile options'].map(
          (option) => (
            <SidebarItem
              key={option}
              label={option}
              active={activeOption === option}
              onClick={() => setActiveOption(option)}
            />
          )
        )}
      </ul>
    </nav>
  </div>
);

// Sidebar Item Component
const SidebarItem = ({ label, active, onClick }) => (
  <li>
    <button
      className={`block w-full text-left px-4 py-2 rounded ${active ? 'bg-indigo-500' : 'hover:bg-gray-700'
        } transition-colors duration-200`}
      onClick={onClick}
    >
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </button>
  </li>
);

// Monitor Section Component
const MonitorSection = () => {
  const [apiCheckData, setApiCheckData] = useState([
    {
      id: 3149,
      apiId: 1,
      apiUrl: 'https://httpbin.org/get',
      dnsLookupTime: 0,
      tcpConnectionTime: 292.738,
      tlsHandshakeTime: 530.061,
      statusCode: 200,
      totalTime: 765.4626,
      checkedAt: '2024-09-09T13:42:59.163Z'
    },
    {
      id: 3400,
      apiId: 1,
      apiUrl: 'https://httpbin.org/get',
      dnsLookupTime: 0,
      tcpConnectionTime: 287.858,
      tlsHandshakeTime: 523.4407,
      statusCode: 200,
      totalTime: 761.8086,
      checkedAt: '2024-09-09T13:43:19.712Z'
    },
    {
      id: 3651,
      apiId: 1,
      apiUrl: 'https://httpbin.org/get',
      dnsLookupTime: 0,
      tcpConnectionTime: 271.792,
      tlsHandshakeTime: 498.6554,
      statusCode: 200,
      totalTime: 1570.6909,
      checkedAt: '2024-09-09T13:43:42.302Z'
    },
  ]);
  const [selectedApi, setSelectedApi] = useState(null);
  const [apiData] = useState([
    { id: 1, name: 'API 1', lastChecked: '5 minutes ago', status: 'Healthy' },
    { id: 2, name: 'API 2', lastChecked: '10 minutes ago', status: 'Degraded' },
    { id: 3, name: 'API 3', lastChecked: '15 minutes ago', status: 'Down' },
  ]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAPIchecks();
        setApiCheckData(data);
      } catch (error) {
        console.error("Error fetching API check data", error);
      }
    };

    fetchData();
  }, []);
  return (

  <div>
    <h2 className="text-2xl font-bold mb-6">Monitor</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* List of APIs */}
      <div className="col-span-1">
        <ul className="space-y-4">
          {apiData.map((api) => (
            <li key={api.id}>
              <button
                className={`w-full text-left p-4 rounded-lg border ${selectedApi === api.id ? 'border-indigo-500 bg-indigo-100' : 'border-gray-300 bg-white'
                  } shadow-sm hover:shadow-md transition-shadow duration-300`}
                onClick={() => setSelectedApi(api.id)}
              >
                <div className="font-medium">{api.name}</div>
                <div className="text-sm text-gray-500">Last checked: {api.lastChecked}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* API Details & Chart */}
      <div className="col-span-2">
        {selectedApi ? (
          <ApiDetails api={apiData.find((api) => api.id === selectedApi)} apiCheckData={apiCheckData} />
        ) : (
          <p className="text-gray-500">Select an API to view details.</p>
        )}
      </div>
    </div>
  </div>
)};

// API Details Component with Chart
const ApiDetails = ({ api, apiCheckData }) => {
  const [selectedRange, setSelectedRange] = useState('24 hr');

  // Handle dropdown change
  const handleRangeChange = (e) => {
    setSelectedRange(e.target.value);
    // Add logic to fetch and update data based on the selected range
    // fetchAPIChecks(e.target.value);
  };

  const filteredData = apiCheckData.filter((check) => check.apiId === api.id);

  // Prepare data for the chart
  const labels = filteredData.map((check) => new Date(check.checkedAt).toLocaleTimeString());
  const dnsLookupTimes = filteredData.map((check) => check.dnsLookupTime);
  const tcpConnectionTimes = filteredData.map((check) => check.tcpConnectionTime);
  const tlsHandshakeTimes = filteredData.map((check) => check.tlsHandshakeTime);
  const totalTimes = filteredData.map((check) => check.totalTime);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'DNS Lookup Time',
        data: dnsLookupTimes,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
      {
        label: 'TCP Connection Time',
        data: tcpConnectionTimes,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
      {
        label: 'TLS Handshake Time',
        data: tlsHandshakeTimes,
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: false,
      },
      {
        label: 'Total Time',
        data: totalTimes,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time Checked',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Time (ms)',
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl font-bold mb-4">{api.name}</h3>

        {/* Dropdown for time range selection */}
        <div className="ml-auto mb-4">
          <Select
            value={selectedRange}
            onChange={handleRangeChange}
          >
            <MenuItem value="24 hr">
            </MenuItem>
            <MenuItem value="24 hr">24 Hours</MenuItem>
            <MenuItem value="7 day">7 Days</MenuItem>
            <MenuItem value="1 month">1 Month</MenuItem>
            <MenuItem value="3 month">3 Months</MenuItem>
            <MenuItem value="forever">Forever</MenuItem>
          </Select>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">Last checked: {api.lastChecked}</p>

      {/* Display the Line Chart */}
      <div className="relative w-full h-80 md:h-96">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
