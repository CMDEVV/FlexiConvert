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

const tools = [
  {
    id: 1,
    name: "Custom",
    convertTo: "Custom",
    href: "#",
  },
  {
    id: 2,
    name: "Png To Jpeg",
    convertTo: "Jpeg",
    href: "#",
  },
  {
    id: 3,
    name: "Jpeg To Png",
    convertTo: "Png",
    href: "#",
  },
];

function CardMain() {
  //   const [val1, , val2] = tools.map((item) => item.name.split(" "));

  return (
    <div className="grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-5 ">
      {tools.map((item) => (
        <Card key={item.id} className="sm:w-1 md:w-96 cursor-pointer ">
          <CardHeader className="items-center">
            <CardTitle> {item.name.match(/\w+/g)[0] || "N/A"}</CardTitle>
            <ChevronDownIcon className="w-10" />
            <CardTitle>{item.name.match(/\w+/g)[2] || "N/A"}</CardTitle>
          </CardHeader>
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
