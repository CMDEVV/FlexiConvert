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

type imagePopupType = {
  convertedFormat: string;
  convertedImage: string;
};

type ImagePopupMainType = {
  data: imagePopupType;
};

export function ImagePopup({ data }: ImagePopupMainType) {
  // console.log("Popup_Preview", data);
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
      </DialogContent>
    </Dialog>
  );
}
