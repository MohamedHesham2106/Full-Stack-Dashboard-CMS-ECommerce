import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CategoryColumn,
  Columns,
} from "@/components/billboard/category-columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface CategoryClientProps {
  data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage your categories for this store."
        />
        <Button onClick={() => navigate(`/${params.storeId}/categories/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Categories" />
      <Separator />
      <ApiList
        entityName="categories"
        entityIdName="categoryId"
        paramName="storeId"
        paramValue={params.storeId}
      />
    </>
  );
};
