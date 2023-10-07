/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { ImagePlus } from "lucide-react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface CloudinaryOptions {
  cloudName: string;
  uploadPreset: string;
}

interface CloudinaryWidgetResult {
  event: string;
  info: any; // You might want to replace this with a specific type
}

interface CldUploadWidgetProps {
  disabled?: boolean;
  onUpload: (value: CloudinaryWidgetResult) => void;
}

let cloudinary: any;
let widget: any;

export const CldUploadWidget: React.FC<CldUploadWidgetProps> = ({
  disabled,
  onUpload,
}) => {
  useEffect(() => {
    // Store the Cloudinary window instance to a ref when the page renders

    if (!cloudinary) {
      cloudinary = window.cloudinary;
    }

    function onIdle() {
      if (!widget) {
        widget = createWidget();
      }
    }

    "requestIdleCallback" in window
      ? requestIdleCallback(onIdle)
      : setTimeout(onIdle, 1);

    // eslint-disable-next-line
  }, []);

  /**
   * createWidget
   * @description Creates a new instance of the Cloudinary widget and stores it in a ref
   */

  function createWidget() {
    const options: CloudinaryOptions = {
      cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
      uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET, // Ex: myuploadpreset
    };

    return cloudinary?.createUploadWidget(
      options,
      function (error: any, result: CloudinaryWidgetResult) {
        // For now, result.info is still using 'any', you might want to replace it with a specific type
        if (error || result.event === "success") {
          onUpload(result);
        }
      }
    );
  }

  function open() {
    if (!widget) {
      widget = createWidget();
    }

    widget && widget.open();
  }

  return (
    <Button
      type="button"
      disabled={disabled}
      variant="secondary"
      onClick={() => open()}
    >
      <ImagePlus className="h-4 w-4 mr-2" />
      Upload an Image
    </Button>
  );
};
