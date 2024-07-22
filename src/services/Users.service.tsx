// src/services/Users.service.tsx
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase/firebaseConfig";

export interface User {
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

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const usersCollection = collection(db, "users");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({
      ...(doc.data() as Omit<User, 'UserID'>),
      UserID: doc.id
    }));
    return userList;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};