import Layout from "@/components/Layout/Layout";
import UserManagementTable, { User } from "./user-management-tab";

export default function UserManagementPage() {
  const mockUsers: User[] = [
    {
      id: 1,
      avatar: "../Group.png",
      name: "John Carter",
      email: "johnny@xyz.com",
      phone: "(251) 907 124242",
      location: "AA, Ethiopia",
      queries: "20.4K",
      status: "Active",
    },
    {
      id: 2,
      avatar: "../Group.png",
      name: "Sophie Moore",
      email: "sophie@livefacet.com",
      phone: "(249) 410 - 4577",
      location: "United Kingdom",
      queries: "8.1K",
      status: "Inactive",
    },
    {
      id: 3,
      avatar: "../Group.png",
      name: "Matt Carson",
      email: "matt@bigtools.com",
      phone: "(251) 907 124242",
      location: "Addis Ababa, Ethiopia",
      queries: "3.2K",
      status: "Inactive",
    },
     {id: 4,
      avatar: "../Group.png",
      name: "John Carter",
      email: "johnny@xyz.com",
      phone: "(251) 907 124242",
      location: "AA, Ethiopia",
      queries: "20.4K",
      status: "Active",
    },
    {
      id: 5,
      avatar: "../Group.png",
      name: "Sophie Moore",
      email: "sophie@livefacet.com",
      phone: "(249) 410 - 4577",
      location: "United Kingdom",
      queries: "8.1K",
      status: "Inactive",
    },
    {
      id: 6,
      avatar: "../Group.png",
      name: "Matt Carson",
      email: "matt@bigtools.com",
      phone: "(251) 907 124242",
      location: "Addis Ababa, Ethiopia",
      queries: "3.2K",
      status: "Inactive",
    },
  ];

  return (
    <Layout>
      <div className="p-6">
        <UserManagementTable users={mockUsers} />
      </div>
    </Layout>
  );
}
