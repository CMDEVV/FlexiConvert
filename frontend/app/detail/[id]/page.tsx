"use client";
import UploadFiles from "@/components/UploadFiles";
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

function Page() {
  const params = useParams();

  const id = Array.isArray(params.id)
    ? parseInt(params.id[0])
    : parseInt(params.id ?? "");
  const data = tools.filter((item) => item.id === id);

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
