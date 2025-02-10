// import axios from 'axios'

let baseURL = "";

if (window.location.origin === "http://localhost:3000") {
  baseURL = "http://localhost:8000/";
} else {
  baseURL = process.env.BASE_URL;
}

// const baseURLInstance = axios.create({
//     baseURL: baseURL,
// })

const serviceCalls = {
  baseURL,
};

export default serviceCalls;
