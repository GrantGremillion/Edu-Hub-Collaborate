/// Setting up a base url for all axios requests ///
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

console.log(baseURL);

const axiosInstance = axios.create({
    baseURL: baseURL
});

export default axiosInstance;

