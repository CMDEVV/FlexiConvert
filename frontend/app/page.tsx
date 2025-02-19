import HomeContent from "@/components/HomeContent";
// import { useEffect } from "react";
// import serviceCalls from "../services/service";

export default function Home() {
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
