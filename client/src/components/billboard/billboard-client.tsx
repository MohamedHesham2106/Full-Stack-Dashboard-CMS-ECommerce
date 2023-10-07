import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BillboardColumn,
  Columns,
} from "@/components/billboard/billboard-columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage your billboards for this store."
        />
        <Button onClick={() => navigate(`/${params.storeId}/billboards/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="label" />
      <Heading title="API" description="API calls for Billboards" />
      <Separator />
      <ApiList
        entityName="billboard"
        entityIdName="billboardId"
        paramName="storeId"
        paramValue={params.storeId}
      />
    </>
  );
};
