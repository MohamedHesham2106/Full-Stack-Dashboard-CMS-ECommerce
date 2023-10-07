import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { AlertModal } from "../modals/alert-modal";
import { useAuth } from "@clerk/clerk-react";
import {
  BillboardColumn,
  CategoryColumn,
  SizeColumn,
  ColorColumn,
} from "./columns";

interface CellActionProps {
  data: BillboardColumn | CategoryColumn | SizeColumn | ColorColumn;
  type: "billboard" | "category" | "sizes" | "colors";
}

export const CellAction: React.FC<CellActionProps> = ({ data, type }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Create a mapping for type-specific information
  const typeInfo = {
    billboard: {
      dataType: "Billboard",
      route: "billboards",
      toastMessage:
        "Make sure you removed all categories using this billboard first.",
    },
    category: {
      dataType: "Category",
      route: "categories",
      toastMessage:
        "Make sure you remove all products using this category first.",
    },
    sizes: {
      dataType: "Size",
      route: "sizes",
      toastMessage: "Handle the size-specific condition here.",
    },
    colors: {
      dataType: "Color",
      route: "colors",
      toastMessage: "Handle the color-specific condition here.",
    },
  };

  const { dataType, route, toastMessage } = typeInfo[type]; 

  const copyHandler = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`${dataType} ID Copied to Clipboard`);
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`/${route}/${data.id}`, {
        params: {
          storeId: params.storeId,
          userId,
        },
      });
      toast.success(`${dataType} deleted.`);
      navigate(`/${params.storeId}/${route}`);
    } catch (error) {
      toast.error(toastMessage);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigate(`/${params.storeId}/${route}/${data.id}`)}
            className="cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => copyHandler(data.id)}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
