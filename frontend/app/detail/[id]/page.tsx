"use client";
import UploadFiles from "@/components/UploadFiles";
import React from "react";
import { useParams } from "next/navigation";
import { tools } from "@/components/Card";

// export async function getServerSideProps(context) {
//   const { id } = context.params;
//   const { name, convertFrom, convertTo } = context.query;

//   return {
//     props: { data: { id, name, convertFrom, convertTo } },
//   };
// }

// type Props = {
//   param: MyData;
// };

// type MyData = {
//   id: number;
//   name: string;
//   convertFrom: string;
//   convertTo: string;
// };

function Page() {
  const params = useParams();

  console.log(params);

  const data = tools.filter((item) => item.id === parseInt(params.id));
  console.log(data);
  return (
    <div>
      {/* <h1>ID: {id}</h1> */}
      <UploadFiles data={data[0]} />
    </div>
  );
}

export default Page;
