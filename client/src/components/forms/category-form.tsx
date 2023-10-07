import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Categories } from "types";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import { AlertModal } from "@/components/modals/alert-modal";
import { useAuth } from "@clerk/clerk-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const schema = z.object({
  name: z.string().min(1, {
    message: "this field is required.",
  }),
  billboardId: z.string().min(1, {
    message: "this field is required.",
  }),
});
type CategoryFormValue = z.infer<typeof schema>;
interface CategoryFormProps {
  billboards: Billboard[];
  initialData: Categories | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards,
}) => {
 
  const { userId } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData ? "Edit Category" : "Add a new Category";
  const action = initialData ? "Save Changes" : "Create";

  const toastMessage = initialData ? "Category Updated." : "Category Created.";
  const form = useForm<CategoryFormValue>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });
  useEffect(() => {
    if (initialData) form.reset(initialData);
  }, [form, initialData]);

  const onSubmit = async (values: CategoryFormValue) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axiosInstance.patch(`/categories/${params.categoryId}`, values, {
          params: {
            storeId: params.storeId,
            userId: userId,
          },
        });
      } else {
        await axiosInstance.post(
          "/categories",
          {
            ...values,
            storeId: params.storeId,
          },
          {
            params: {
              userId,
            },
          }
        );
      }
      toast.success(toastMessage);
      navigate(`/${params.storeId}/categories`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`/categories/${params.categoryId}`, {
        params: {
          storeId: params.storeId,
          userId,
        },
      });
      toast.success("Category deleted.");
      navigate(`/${params.storeId}/categories`);
    } catch (error) {
      toast.error(
        "Make sure you removed all products using this category first."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            disabled={isLoading}
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Category Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem
                          className="cursor-pointer"
                          key={billboard.id}
                          value={billboard.id}
                        >
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};
