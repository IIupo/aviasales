import axios from 'axios';

const API_BASE_URL = 'https://aviasales-test-api.kata.academy';
const RETRY_LIMIT = 3;
const RETRY_DELAY = 1000;

const fetchWithRetry = async (requestFn: () => Promise<any>, retries = RETRY_LIMIT) => {
  try {
    return await requestFn();
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(requestFn, retries - 1);
    } else {
      throw error;
    }
  }
};

export const fetchSearchId = async () => {
  const requestFn = async () => {
    const response = await axios.get(`${API_BASE_URL}/search`);
    return response.data.searchId;
  };
  return fetchWithRetry(requestFn);
};

export const fetchTickets = async (searchId: string) => {
  const requestFn = async () => {
    const response = await axios.get(`${API_BASE_URL}/tickets?searchId=${searchId}`);
    return response.data;
  };
  return fetchWithRetry(requestFn);
};
