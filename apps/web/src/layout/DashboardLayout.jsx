import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import fetchAPIchecks from '../services/apiChecks/fetchAPIChecks';
import { createTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const DashboardContent = ({ pathname, apiData, selectedApi, setSelectedApi, apiCheckData }) => {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {pathname === 'dashboard' ? (
        <MonitorSection
          apiData={apiData}
          selectedApi={selectedApi}
          setSelectedApi={setSelectedApi}
          apiCheckData={apiCheckData}
        />
      ) : (
        <Typography>{pathname} section coming soon...</Typography>
      )}
    </Box>
  );
};

DashboardContent.propTypes = {
  pathname: PropTypes.string.isRequired,
  apiData: PropTypes.array.isRequired,
  selectedApi: PropTypes.number,
  setSelectedApi: PropTypes.func.isRequired,
  apiCheckData: PropTypes.array.isRequired,
};

function DashboardLayoutBasic() {
  const [pathname, setPathname] = useState('dashboard');
  const [activeOption, setActiveOption] = useState('monitor');
  const [selectedApi, setSelectedApi] = useState(null);

  const [apiData] = useState([
    { id: 1, name: 'API 1', lastChecked: '5 minutes ago', status: 'Healthy' },
    { id: 2, name: 'API 2', lastChecked: '10 minutes ago', status: 'Degraded' },
    { id: 3, name: 'API 3', lastChecked: '15 minutes ago', status: 'Down' },
  ]);

  const [apiCheckData, setApiCheckData] = useState([]);

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

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
      <DashboardLayout>
        <DashboardContent
          pathname={pathname}
          apiData={apiData}
          selectedApi={selectedApi}
          setSelectedApi={setSelectedApi}
          apiCheckData={apiCheckData}
        />
      </DashboardLayout>
    </AppProvider>
  );
}

// Monitor Section Component
const MonitorSection = ({ apiData, selectedApi, setSelectedApi, apiCheckData }) => (
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
);

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
          text: 'Milliseconds (ms)',
        },
      },
    },
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-2">{api.name}</h3>
      <p className="text-sm text-gray-500 mb-4">Status: {api.status}</p>
      <div className="mb-4">
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Select Range</InputLabel>
          <Select value={selectedRange} onChange={handleRangeChange} label="Select Range">
            <MenuItem value="24 hr">24 hr</MenuItem>
            <MenuItem value="7 days">7 days</MenuItem>
            <MenuItem value="30 days">30 days</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="relative" style={{ height: '400px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

// Export the main component
export default DashboardLayout;
