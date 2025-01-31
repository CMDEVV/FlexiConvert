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

type Props = {
  props: convertTypes;
};
type convertTypes = {
  convertTo: string;
};

// If chosen image is jpeg than set default to png and vice versa
// Dont need a dropdown if only 1 item is available
// add placeholder instead eg.(...,select) for multiple images

export function ConvertDropdown({ data }) {
  console.log("DropDownDataa", data);

  const [position, setPosition] = React.useState("");
  const [obj, setOjb] = useState([]);
  // const [obj, setOjb] = useState<any[]>([]);

  useEffect(() => {
    if (!Array.isArray(data)) {
      setPosition(data);
    } else {
      setOjb(data);
    }
  }, []);
  console.log("convertTypess", obj);

  // useEffect(() => {
  //   if (obj.count < 1) {
  //     setPosition(data);
  //   }
  // }, []);

  // console.log("PositionSett", position);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant="outline">{obj}</Button> */}
        <Button variant="outline">{position}</Button>
      </DropdownMenuTrigger>
      {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel> */}
      {/* <DropdownMenuSeparator /> */}

      {obj.length > 1 && (
        <DropdownMenuContent className="w-56">
          <>
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
          </>
        </DropdownMenuContent>
      )}

      {/* {obj.map((item) => (
          <div key={item.id}>
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowActivityBar}
            >
              {item.name}
            </DropdownMenuCheckboxItem>
          </div>
        ))} */}
      {/* <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          {obj}
        </DropdownMenuCheckboxItem> */}
    </DropdownMenu>
  );
}
