import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "types";
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
  value: z
    .string()
    .min(4, {
      message: "this field is required.",
    })
    .regex(/^#/, {
      message: "String must be a valid hex code",
    }),
});
type ColorFormValues = z.infer<typeof schema>;
interface ColorFormProps {
  initialData: Color | null;
}

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const { userId } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title = initialData ? "Edit Color" : "Create Color";
  const description = initialData ? "Edit Color" : "Add a new Color";
  const action = initialData ? "Save Changes" : "Create";

  const toastMessage = initialData ? "Color Updated." : "Color Created.";
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });
  useEffect(() => {
    if (initialData) form.reset(initialData);
  }, [form, initialData]);

  const onSubmit = async (values: ColorFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axiosInstance.patch(`/colors/${params.colorId}`, values, {
          params: {
            storeId: params.storeId,
            userId: userId,
          },
        });
      } else {
        await axiosInstance.post(
          "/colors",
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
      navigate(`/${params.storeId}/colors`);
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
      await axiosInstance.delete(`/colors/${params.colorId}`, {
        params: {
          storeId: params.storeId,
          userId,
        },
      });
      toast.success("Color deleted.");
      navigate(`/${params.storeId}/colors`);
    } catch (error) {
      toast.error("Make sure you removed all products using this color first.");
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
                      placeholder="Color name"
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
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={isLoading}
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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
