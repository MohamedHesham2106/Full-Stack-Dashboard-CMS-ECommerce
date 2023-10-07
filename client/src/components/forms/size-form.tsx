import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "types";
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
import { useAuth } from "@clerk/clerk-react";

const schema = z.object({
  name: z.string().min(1, {
    message: "this field is required.",
  }),
  value: z.string().min(1, {
    message: "this field is required.",
  }),
});
type SizeFormValues = z.infer<typeof schema>;
interface SizeFormProps {
  initialData: Size | null;
}

export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const { userId } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title = initialData ? "Edit Size" : "Create Size";
  const description = initialData ? "Edit Size" : "Add a new Size";
  const action = initialData ? "Save Changes" : "Create";

  const toastMessage = initialData ? "Size Updated." : "Size Created.";
  const form = useForm<SizeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });
  useEffect(() => {
    if (initialData) form.reset(initialData);
  }, [form, initialData]);

  const onSubmit = async (values: SizeFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axiosInstance.patch(`/sizes/${params.sizeId}`, values, {
          params: {
            storeId: params.storeId,
            userId: userId,
          },
        });
      } else {
        await axiosInstance.post(
          "/sizes",
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
      navigate(`/${params.storeId}/sizes`);
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
      await axiosInstance.delete(`/sizes/${params.sizeId}`, {
        params: {
          storeId: params.storeId,
          userId,
        },
      });
      toast.success("Size deleted.");
      navigate(`/${params.storeId}/sizes`);
    } catch (error) {
      toast.error(
        "Make sure you removed all products using this size first."
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
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Size value"
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
