// "use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChevronDownIcon } from "@heroicons/react/24/solid";

import Link from "next/link";
import { useRouter } from "next/navigation";

// Make this into a JSON File
export const tools = [
  {
    id: 1,
    name: "Custom",
    convertFrom: "",
    convertTo: [
      {
        id: 1,
        name: "Jpeg",
      },
      {
        id: 2,
        name: "Png",
      },
      {
        id: 3,
        name: "Pdf",
      },
      {
        id: 4,
        name: "Heic",
      },
      {
        id: 5,
        name: "Svg",
      },
    ],
    // convertTo: "Custom",
    href: "#",
  },
  {
    id: 2,
    name: "Png To Jpeg",
    convertFrom: "Png",
    convertTo: "Jpeg",
    href: "#",
  },
  {
    id: 3,
    name: "Jpeg To Png",
    convertFrom: "Jpeg",
    convertTo: "Png",
    href: "#",
  },
];

type DataType = {
  name: string;
};

type CardMainProps = {
  data: DataType;
};

function CardMain({ data }: CardMainProps) {
  return (
    <div
      className={`grid gap-5 ${
        data.name == "grid"
          ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
          : "grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3"
      }`}
    >
      {tools.map((item) => (
        // <Card key={item.id} className="sm:w-1 md:w-96 cursor-pointer">
        <Card key={item.id} className="cursor-pointer">
          <Link href={`/detail/${item.id}`}>
            <CardHeader className="items-center">
              <CardTitle> {item.convertFrom}</CardTitle>
              {item.convertFrom ? <ChevronDownIcon className="w-10" /> : ""}
              {item.name === "Custom" ? (
                <>
                  <CardTitle>{item.name}</CardTitle>
                </>
              ) : (
                <>
                  <CardTitle>
                    {Array.isArray(item.convertTo)
                      ? item.convertTo.map((entry) => (
                          <span key={entry.id}>{entry.name}</span>
                        ))
                      : item.convertTo}
                  </CardTitle>
                </>
              )}
              {/* {item.name == "Custom" ? (
                <>
                  <CardTitle>{item.name}</CardTitle>
                </>
              ) : (
                <>
                  <CardTitle>{item.convertTo}</CardTitle>
                </>
              )} */}
            </CardHeader>
          </Link>
          {/* <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>
      ))}
    </div>
  );
}

export default CardMain;
