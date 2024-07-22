// src/services/UserProfile.service.tsx
import { collection, query, where, getDocs, doc, getDoc, DocumentReference } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

export const fetchUser = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { user: docSnap.data(), userRef: docRef };
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const fetchProjects = async (userRef: DocumentReference) => {
  try {
    const q = query(collection(db, "projects"), where("userID", "==", userRef));
    const querySnapshot = await getDocs(q);
    const projectsData: any[] = [];
    let amountReceived = 0;
    let amountDue = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      projectsData.push({ id: doc.id, ...data });
      amountReceived += data.paymentReceived || 0;
      amountDue += data.paymentDue || 0;
    });
    return { projects: projectsData, amountReceived, amountDue };
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};