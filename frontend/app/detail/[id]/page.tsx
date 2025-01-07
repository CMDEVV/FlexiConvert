"use client";
import UploadFiles from "@/components/UploadFiles";
import React from "react";
import { useParams } from "next/navigation";
import { tools } from "@/components/Card";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>
              {data[0].name !== "Custom"
                ? `${data[0].convertFrom} to ${data[0].convertTo}`
                : data[0].convertTo}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Upload Component */}
      <UploadFiles data={data[0]} />
    </div>
  );
}

export default Page;
