import { collection, query, where, getDocs, doc, getDoc, DocumentReference } from "firebase/firestore";
import { db } from "@/config/firebase/firebaseConfig";
import { Project } from "@/components/work/services/work.service";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: {
    pincode: string;
    town: string;
    street: string;
    district: string;
    gUrl: string;
    state: string;
  };
  profileImg?: string;
  isAdmin?: boolean;
}

export interface UserProfileData {
  user: UserProfile;
  projects: Project[];
  amountReceived: number;
  amountDue: number;
}

export const fetchUserProfile = async (userId: string): Promise<UserProfileData> => {
  try {
    // Fetch user data
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error("User not found");
    }
    
    const userData = docSnap.data();
    const user: UserProfile = {
      id: docSnap.id,
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address,
      profileImg: userData.profileImg,
      isAdmin: userData.isAdmin
    };
    
    // Fetch user's projects
    const q = query(collection(db, "projects"), where("userID", "==", docRef));
    const querySnapshot = await getDocs(q);
    const projectsData: Project[] = [];
    let amountReceived = 0;
    let amountDue = 0;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      projectsData.push({ 
        id: doc.id, 
        name: data.name || '',
        location: data.location || '',
        status: data.status || '',
        paymentReceived: Number(data.paymentReceived) || 0,
        paymentDue: Number(data.paymentDue) || 0,
        updates: data.updates || [],
        quotationUrl: data.quotationUrl,
        reportUrl: data.reportUrl,
        ownerName: data.ownerName,
        ownerPhone: data.ownerPhone,
        customBoqUrl: data.customBoqUrl,
        userID: docRef as unknown as DocumentReference,
        isOwnerDifferent: data.isOwnerDifferent || false,
        customBoQ: data.customBoQ || false,
        boreHoles: Number(data.boreHoles) || null,
        boreHoleDepth: Number(data.boreHoleDepth) || null,
        selectedServices: data.selectedServices || null,
        area: Number(data.area) || null,
        priority: data.priority || false,
        remarks: data.remarks || null,
        trackingLink: data.trackingLink
      });
      
      amountReceived += Number(data.paymentReceived) || 0;
      amountDue += Number(data.paymentDue) || 0;
    });
    
    return { 
      user, 
      projects: projectsData, 
      amountReceived, 
      amountDue 
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}; 