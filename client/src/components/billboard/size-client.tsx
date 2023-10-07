import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { SizeColumn, Columns } from "@/components/billboard/size-columns";

interface SizeClientProps {
  data: SizeColumn[];
}

export const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store."
        />
        <Button onClick={() => navigate(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Sizes" />
      <Separator />
      <ApiList
        entityName="sizes"
        entityIdName="sizeId"
        paramName="storeId"
        paramValue={params.storeId}
      />
    </>
  );
};
