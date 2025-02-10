// import axios from 'axios'
"use client";
let baseURL = "";

if (window.location.origin === "http://localhost:3000") {
  baseURL = process.env.NEXT_PUBLIC_LOCAL_URL;
} else {
  baseURL = process.env.NEXT_PUBLIC_BASE_URL;
}

// const baseURLInstance = axios.create({
//     baseURL: baseURL,
// })

const serviceCalls = {
  baseURL,
};

export default serviceCalls;
