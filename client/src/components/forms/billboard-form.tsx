import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "types";
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
import { AlertModal } from "../modals/alert-modal";
import { ImageUpload } from "../ui/image-upload";
import { useAuth } from "@clerk/clerk-react";

const schema = z.object({
  label: z.string().min(1, {
    message: "this field is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "this field is required.",
  }),
});
type BillboardFormValues = z.infer<typeof schema>;
interface BillboardFormProps {
  initialData: Billboard | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const { userId } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title = initialData ? "Edit Billboard" : "Create Billboard";
  const description = initialData ? "Edit Billboard" : "Add a new Billboard";
  const action = initialData ? "Save Changes" : "Create";

  const toastMessage = initialData
    ? "Billboard Updated."
    : "Billboard Created.";
  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });
  useEffect(() => {
    if (initialData) form.reset(initialData);
  }, [form, initialData]);

  const onSubmit = async (values: BillboardFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axiosInstance.patch(`/billboard/${params.billboardId}`, values, {
          params: {
            storeId: params.storeId,
            userId: userId,
          },
        });
      } else {
        await axiosInstance.post(
          "/billboard",
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
      navigate(`/${params.storeId}/billboards`);
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
      await axiosInstance.delete(`/billboard/${params.billboardId}`, {
        params: {
          storeId: params.storeId,
          userId,
        },
      });
      toast.success("Billboard deleted.");
      navigate(`/${params.storeId}/billboards`);
    } catch (error) {
      toast.error(
        "Make sure you removed all categories using this billboard first."
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    value={field.value ? [field.value] : []}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Billboard Label"
                      {...field}
                    />
                  </FormControl>
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
