import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase/firebaseConfig";

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
  isAdmin?: boolean;
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

export const fetchUserById = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    
    if (userDoc.exists()) {
      return {
        ...(userDoc.data() as Omit<User, 'UserID'>),
        UserID: userDoc.id
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}; 