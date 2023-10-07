import { ApiAlert } from "./api-alert";
interface ApiListProps {
  entityName: string;
  entityIdName: string;
  paramName?: string;
  paramValue?: string;
}
export const ApiList: React.FC<ApiListProps> = ({
  entityIdName,
  entityName,
  paramName,
  paramValue,
}) => {
  const baseUrl = `${import.meta.env.VITE_PUBLIC_API_URL}`;
  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}${
          paramName ? `?${paramName}=${paramValue}` : ""
        }`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}?userId={userId}${
          paramName ? `&${paramName}=${paramValue}` : ""
        }`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}?userId={userId}${
          paramName ? `&${paramName}=${paramValue}` : ""
        }`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}?userId={userId}${
          paramName ? `&${paramName}=${paramValue}` : ""
        }`}
      />
    </>
  );
};
