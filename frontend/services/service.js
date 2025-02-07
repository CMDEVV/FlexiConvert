// import axios from 'axios'

let baseURL = "";

if (window.location.origin === "http://localhost:3000") {
  baseURL = "http://localhost:8000/";
} else {
  baseURL = "https://server-production-24fc.up.railway.app/";
}

// const baseURLInstance = axios.create({
//     baseURL: baseURL,
// })

const serviceCalls = {
  baseURL,
};

export default serviceCalls;
