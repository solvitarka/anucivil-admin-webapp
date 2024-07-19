"use client"

import UsersTable from "../../components/usersPage/UsersTable";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase/firebaseConfig";
import withAuth from '@/components/withAuth';

interface User {
  UserID: string;
  name: string;
  email: string;
  phone: string;
  address: {
    pincode: string;
    town: string;
    street: string;
    district: string;
    gUrl: string;
    state: string;
  };
  profileImg: string;
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({
        ...(doc.data() as Omit<User, 'UserID'>),
        UserID: doc.id
      }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      
      <UsersTable data={users} />
    </div>
  );
};


export default withAuth(UserManagementPage);