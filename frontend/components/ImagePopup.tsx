import { Copy, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

export function ImagePopup({ data }) {
  //   console.log("Popup_Preview", data);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Eye />
          {/* <span>Preview</span> */}
        </Button>
        {/* <Button variant="outline">Share</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Preview</DialogTitle>
        <img
          src={`data:image/${data.convertedFormat};base64,${data.convertedImage}`}
          alt="preview"
        />
        {/* <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
         
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
