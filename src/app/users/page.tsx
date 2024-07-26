"use client"

import UsersTable from "../../components/usersPage/UsersTable";
import { useEffect, useState } from "react";
import withAuth from '@/components/withAuth';
import { fetchUsers, User } from '@/services/Users.service';

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userList = await fetchUsers();
        setUsers(userList);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <UsersTable data={users} />
    </div>
  );
};

export default withAuth(UserManagementPage);