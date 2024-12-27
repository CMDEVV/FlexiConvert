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
    name: "All",
    href: "#",
  },
  {
    id: 2,
    name: "Png To Jpeg",
    href: "#",
  },
  {
    id: 3,
    name: "Jpeg To Png",
    href: "#",
  },
];

function CardMain() {
  //   const [val1, , val2] = tools.map((item) => item.name.split(" "));

  return (
    <div className="flex space-x-5">
      {tools.map((item) => (
        <Card key={item.id} className="w-80 cursor-pointer">
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
