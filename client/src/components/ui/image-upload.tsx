import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import { CloudinaryUploadWidget } from "react-cloudinary-uploader";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (values: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpload = (result: any) => {
    const secureUrl = result?.secure_url;
    if (secureUrl) {
      // Create a new array of image objects by combining the existing images and the newly uploaded image

      onChange(secureUrl);
    }
  };
  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                size={"icon"}
                onClick={() => onRemove(url)}
                variant="destructive"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <img
              className="object-cover w-full h-full"
              src={url}
              alt="uploaded image"
            />
          </div>
        ))}
      </div>
      <CloudinaryUploadWidget
        cloudName={import.meta.env.VITE_CLOUDINARY_NAME}
        uploadPreset={import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}
        onUploadSuccess={onUpload}
        options={{
          clientAllowedFormats: ["png", "jpeg", "jpg"],
          resourceType: "image",
          folder: "images",
          sources: ["local", "url", "camera", "google_drive"],
          multiple: false,
        }}
      >
        <Button type="button" disabled={disabled} variant="secondary">
          <ImagePlus className="h-4 w-4 mr-2" />
          Upload an Image
        </Button>
      </CloudinaryUploadWidget>
    </div>
  );
};
