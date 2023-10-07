import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { ColorColumn, Columns } from "./color-columns";

interface ColorClientProps {
  data: ColorColumn[];
}

export const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data?.length})`}
          description="Manage colors for your store."
        />
        <Button onClick={() => navigate(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Colors" />
      <Separator />
      <ApiList
        entityName="colors"
        entityIdName="colorId"
        paramName="storeId"
        paramValue={params.storeId}
      />
    </>
  );
};
