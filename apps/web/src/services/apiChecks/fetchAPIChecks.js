import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api-checks/1/last3months'; // Replace with your actual API URL

async function fetchAPIChecks() {
  try {
    const response = await axios.get(BASE_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching API checks:', error);
    throw error;
  }
}

export default fetchAPIChecks;