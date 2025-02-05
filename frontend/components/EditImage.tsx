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

type EditMainProps = {
  // onSave: (editedFile: File) => void;
  onSave: (quality: Number, width: string, height: string) => void;
  onClose: () => void;
};

export function EditImage({ onSave, onClose }: EditMainProps) {
  // console.log("EditPage", file);

  const [isOpen, setIsOpen] = useState(false);
  // const [quality, setQuality] = useState(file.customQuality || 80);
  // const [width, setWidth] = useState(file.customWidth);
  // const [height, setHeight] = useState(file.customHeight);

  const [quality, setQuality] = useState(Number || 80);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  // const [value, setValue] = useState("");

  const min = 0;
  const max = 100;

  const handleSave = () => {
    onSave(quality, width, height);

    setIsOpen(false);
    // console.log("CLickingONSAVE", quality, width, height);
  };

  // const handleChange = (e) => {
  //   let newValue = parseInt(e.target.value, 10);

  //   // Allow empty input or enforce min/max range
  //   if (
  //     newValue === "" ||
  //     (Number(newValue) >= min && Number(newValue) <= max)
  //   ) {
  //     setValue(newValue);
  //   }
  // };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          // className="w-10"
          variant="outline"
          onClick={() => setIsOpen(true)}
        >
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
            <Input
              type="number"
              id="width"
              className="col-span-3"
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="height" className="text-right">
              Height (px)
            </Label>
            <Input
              type="number"
              id="height"
              className="col-span-3"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quality" className="text-right">
              Quality(1-100)
            </Label>
            <Input
              type="number"
              // min={min}
              // max={max}
              // value={value}
              // onChange={handleChange}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              id="quality"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
