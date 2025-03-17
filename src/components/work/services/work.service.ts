import { doc, getDoc, updateDoc, arrayUnion, DocumentReference } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/config/firebase/firebaseConfig";
import { toast } from "sonner";

export interface Update {
  id: number;
  title: string;
  date: string;
}

export interface Project {
  id?: string;
  location: string;
  name: string;
  paymentDue: number | null;
  paymentReceived: number | null;
  status: string;
  updates: Update[];
  quotationUrl: string | null;
  reportUrl: string | null;
  ownerName: string | null;
  ownerPhone: string | null;
  customBoqUrl: string | null;
  userID: DocumentReference;
  isOwnerDifferent: boolean;
  customBoQ: boolean;
  boreHoles: number | null;
  boreHoleDepth: number | null;
  selectedServices: string[] | null;
  area: number | null;
  priority: boolean;
  remarks: string | null;
  trackingLink?: string;
}

export const fetchProject = async (projectId: string): Promise<Project> => {
  try {
    const docRef = doc(db, "projects", projectId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const projectData: Project = {
        id: docSnap.id,
        location: data.location,
        name: data.name,
        paymentDue: typeof data.paymentDue === 'number' ? data.paymentDue : parseFloat(data.paymentDue),
        paymentReceived: typeof data.paymentReceived === 'number' ? data.paymentReceived : parseFloat(data.paymentReceived),
        status: data.status,
        updates: (data.updates as Update[]) || [],
        quotationUrl: data.quotationUrl as string | null,
        reportUrl: data.reportUrl as string | null,
        ownerName: data.ownerName as string | null,
        ownerPhone: data.ownerPhone as string | null,
        customBoqUrl: data.customBoqUrl as string | null,
        userID: docRef as unknown as DocumentReference,
        isOwnerDifferent: data.isOwnerDifferent ?? false,
        customBoQ: data.customBoQ ?? false,
        boreHoles: typeof data.boreHoles === 'number' ? data.boreHoles : parseFloat(data.boreHoles),
        boreHoleDepth: typeof data.boreHoleDepth === 'number' ? data.boreHoleDepth : parseFloat(data.boreHoleDepth),
        selectedServices: data.selectedServices as string[] | null,
        area: typeof data.area === 'number' ? data.area : parseFloat(data.area),
        priority: data.priority ?? false,
        remarks: data.remarks as string | null,
        trackingLink: data.trackingLink,
      };
      return projectData;
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

export const saveProject = async (projectId: string, project: Project, trackingLink: string): Promise<void> => {
  try {
    const docRef = doc(db, "projects", projectId);
    
    // Remove the id field before updating
    const { id, ...projectWithoutId } = project;
    
    await updateDoc(docRef, {
      ...projectWithoutId,
      trackingLink
    });
    
    toast.success("Project updated successfully!");
  } catch (error) {
    console.error("Error updating project:", error);
    toast.error("Failed to update project");
    throw error;
  }
};

export const handleFileUpload = async (
  file: File, 
  fileType: 'boq' | 'quotation' | 'report', 
  projectId: string
): Promise<string> => {
  try {
    const storageRef = ref(storage, `projects/${projectId}/${fileType}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error(`Error uploading ${fileType}:`, error);
    toast.error(`Failed to upload ${fileType}`);
    throw error;
  }
};

export const handleAddUpdate = async (
  projectId: string, 
  newUpdate: string
): Promise<Update> => {
  try {
    const docRef = doc(db, "projects", projectId);
    const newUpdateObj = {
      id: Date.now(),
      title: newUpdate,
      date: new Date().toISOString(),
    };
    
    await updateDoc(docRef, {
      updates: arrayUnion(newUpdateObj)
    });
    
    toast.success("Update added successfully!");
    return newUpdateObj;
  } catch (error) {
    console.error("Error adding update:", error);
    toast.error("Failed to add update");
    throw error;
  }
}; 