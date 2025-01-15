"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

export function EditImage() {
  const [value, setValue] = useState("");
  const min = 0;
  const max = 100;

  const handleChange = (e) => {
    let newValue = parseInt(e.target.value, 10);

    // Allow empty input or enforce min/max range
    if (
      newValue === "" ||
      (Number(newValue) >= min && Number(newValue) <= max)
    ) {
      setValue(newValue);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="width" className="text-right">
              Width (px)
            </Label>
            <Input type="number" id="width" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="height" className="text-right">
              Height (px)
            </Label>
            <Input type="number" id="height" className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quality" className="text-right">
              Quality
            </Label>
            <Input
              type="number"
              min={min}
              max={max}
              value={value}
              onChange={handleChange}
              id="quality"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
