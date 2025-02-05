"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroup,
} from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

// type Props = {
//   props: convertTypes;
// };
// type convertTypes = {
//   convertTo: string;
// };

// If chosen image is jpeg than set default to png and vice versa
// Dont need a dropdown if only 1 item is available
// add placeholder instead eg.(...,select) for multiple images

type DataItem = {
  id: number;
  name: string;
};

type ConvertDropdownProps = {
  data: string | DataItem[];
};

export function ConvertDropdown({ data }: ConvertDropdownProps) {
  console.log("DropDownDataa", data);

  const [position, setPosition] = React.useState("");
  // const [obj, setOjb] = useState([]);
  const [obj, setObj] = useState<DataItem[]>([]);

  const [errMsg, setErrMsg] = useState("");

  // const [obj, setOjb] = useState<any[]>([]);

  // useEffect(() => {
  //   if (!Array.isArray(data)) {
  //     setPosition(data);
  //   } else {
  //     setOjb(data);
  //   }

  //   if (position == "") {
  //     setErrMsg("Select convert to!");
  //   }
  // }, []);

  useEffect(() => {
    if (typeof data === "string") {
      setPosition(data);
    } else if (Array.isArray(data)) {
      setObj(data);
    }

    if (!position) {
      setErrMsg("Select convert to!");
    }
  }, [data]); // Ensure `data` is a dependency to correctly update when `data` changes

  console.log("convertTypess", obj);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{position}</Button>
      </DropdownMenuTrigger>

      {obj.length > 1 && (
        <div>
          {<span className="text-red-300">{position == "" ? errMsg : ""}</span>}
          <DropdownMenuContent className="w-56">
            {obj.map((item) => (
              <DropdownMenuRadioGroup
                key={item.id}
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value={item.name}>
                  {item.name}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            ))}
          </DropdownMenuContent>
        </div>
      )}
    </DropdownMenu>
  );
}
