"use client";
import UploadFiles from "@/components/UploadFiles";
import React, { useEffect } from "react";
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

import serviceCalls from "../../../services/service";

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

  // console.log(params);

  // const data = tools.filter((item) => item.id === parseInt(params.id));

  const id = Array.isArray(params.id)
    ? parseInt(params.id[0])
    : parseInt(params.id ?? "");
  const data = tools.filter((item) => item.id === id);
  // console.log("UploadDataaa", data);

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
                : data[0].name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Upload Component */}
      <UploadFiles
        data={{
          convertFrom: data[0].convertFrom,
          convertTo: data[0].convertTo,
          href: data[0].href,
          id: data[0].id,
          name: data[0].name,
        }}
      />
    </div>
  );
}

export default Page;
