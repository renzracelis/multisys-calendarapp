import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://multisys-calendarapp-jsonserver.vercel.app/',
});

export default axiosClient;