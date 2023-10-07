import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "types";
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
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import { AlertModal } from "../modals/alert-modal";
import { ApiAlert } from "../ui/api-alert";

interface SettingsFormProps {
  initialData: Store;
}
const schema = z.object({
  name: z.string().min(1, {
    message: "this field is required.",
  }),
});
type SettingsFormValues = z.infer<typeof schema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [form, initialData]);
  const onSubmit = async (values: SettingsFormValues) => {
    try {
      setIsLoading(true);
      await axiosInstance.patch(`/store/${params.storeId}`, values, {
        params: {
          userId: userId,
        },
      });
      toast.success("Store settings updated.");
      navigate(`/${params.storeId}/settings`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`/store/${params.storeId}`, {
        params: {
          userId: userId,
        },
      });
      toast.success("Store deleted.");
      navigate("/");
    } catch (error) {
      toast.error("Make sure you removed all products and categories first.");
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
        <Heading
          title="Settings"
          description="Manage store preferences and settings."
        />
        <Button
          variant="destructive"
          size="icon"
          disabled={isLoading}
          onClick={() => setOpen(true)}
        >
          <Trash className="w-4 h-4" />
        </Button>
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
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="VITE_PUBLIC_API_URL"
        description={`${import.meta.env.VITE_PUBLIC_API_URL}/store/${
          params.storeId
        }`}
        variant="public"
      />
    </>
  );
};
