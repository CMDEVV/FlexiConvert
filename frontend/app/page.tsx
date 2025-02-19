"use client";

import HomeContent from "@/components/HomeContent";
import { useEffect } from "react";
import serviceCalls from "../services/service";

export default function Home() {
  useEffect(() => {
    fetch(`${serviceCalls.baseURL}api/get-csrf-token/`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => console.log("CSRF Token set:", data))
      .catch((error) => console.error("CSRF Error:", error));
  }, []);
  return (
    <main className="">
      <HomeContent />
    </main>
  );
}

// export async function getServerSideProps() {
//   console.log("LOCALEND", process.env.LOCAL_URL);
//   return {
//     props: {
//       hello: "world",
//     },
//   };
// }

// export const getStaticProps = () => ({
//   props: {
//     hello: "world",
//   },
// });
