import { useEffect, useState } from "react";
import { CldUploadWidget } from "../cld-upload.widget";
import { Button } from "./button";
import { Trash } from "lucide-react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
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
    console.log("ALO", result);
    onChange(result?.info?.secure_url);
  };
  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <div className=" mb-4 flex items-center gap-4">
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
      <CldUploadWidget disabled={disabled} onUpload={onUpload} />
    </div>
  );
};
