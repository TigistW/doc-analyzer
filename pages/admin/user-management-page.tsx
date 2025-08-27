import Layout from "@/components/Layout/Layout";
import UserManagementTable from "./user-management-tab";

export default function UserManagementPage() {

  return (
    <Layout>
      <div>
        <UserManagementTable />
      </div>
    </Layout>
  );
}
