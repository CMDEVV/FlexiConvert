import HomeContent from "@/components/HomeContent";
import Image from "next/image";

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
