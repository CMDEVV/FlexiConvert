"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

type Props = {
  props: convertTypes;
};
type convertTypes = {
  convertTo: string;
};

export function ConvertDropdown({ data }) {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);
  const [obj, setOjb] = useState([]);

  useEffect(() => {
    setOjb(data);
  }, []);
  //   console.log("convertTypess", obj);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{obj}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}

        {/* {obj.map((item) => (
          <div>
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowActivityBar}
            >
              {item}
            </DropdownMenuCheckboxItem>
          </div>
        ))} */}
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          {obj}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
