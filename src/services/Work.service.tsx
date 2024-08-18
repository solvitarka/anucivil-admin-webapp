import { doc, getDoc, updateDoc, arrayUnion, DocumentReference } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../lib/firebase/firebaseConfig";
import ProjectUpdates from "@/components/workPage/ProjectUpdates";
import { toast } from "sonner"


interface Update {
  id: number;
  title: string;
  date: string;
}

interface Project {
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

export const fetchProject = async (projectId: string, setProject: (project: Project) => void, setLoading: (loading: boolean) => void, setTrackingLink: (trackingLink: string | "") => void) => {
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
      setProject(projectData);
      setTrackingLink(projectData.trackingLink!);
    } else {
      console.error("No such document!");
    }
  } catch (error) {
    console.error("Error fetching project:", error);
  } finally {
    setLoading(false);
  }
};


export const saveProject = async (projectId: string, project: Project, trackingLink: string) => {
  try {
    const docRef = doc(db, "projects", projectId);
    await updateDoc(docRef, {
      name: project.name,
      location: project.location,
      area: project.area !== null ? Number(project.area) : null,
      boreHoleDepth: project.boreHoleDepth !== null ? Number(project.boreHoleDepth) : null,
      boreHoles: project.boreHoles !== null ? Number(project.boreHoles) : null,
      customBoQ: project.customBoQ,
      isOwnerDifferent: project.isOwnerDifferent,
      ownerName: project.ownerName,
      ownerPhone: project.ownerPhone,
      paymentDue: project.paymentDue !== null ? Number(project.paymentDue) : null,
      paymentReceived: project.paymentReceived !== null ? Number(project.paymentReceived) : null,
      priority: project.priority,
      remarks: project.remarks,
      selectedServices: project.selectedServices,
      status: project.status,
      trackingLink: trackingLink,
      updates:project.updates
    });
    toast("Project updated successfully!");
  
    
  } catch (error) {
    console.error("Error updating project:", error);
    toast("Error updating project.");
  }
};


export const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, fileType: 'boq' | 'quotation' | 'report', projectId: string, setUpdatedProject: (updates: Partial<Project>) => void) => {
  const file = event.target.files?.[0];
  if (!file || !projectId) return;

  const storageRef = ref(storage, `projects/${projectId}/${fileType}/${file.name}`);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    const docRef = doc(db, "projects", projectId);
    let updateObj: Partial<Project> = {};
    if (fileType === 'boq') {
      updateObj = { customBoqUrl: downloadURL };
    } else if (fileType === 'quotation') {
      updateObj = { quotationUrl: downloadURL };
    } else if (fileType === 'report') {
      updateObj = { reportUrl: downloadURL };
    }

    await updateDoc(docRef, updateObj);
    setUpdatedProject(updateObj);
    toast(`${fileType.charAt(0).toUpperCase() + fileType.slice(1)} uploaded successfully!`);

    // Reload the page after the file is uploaded
    window.location.reload();
  } catch (error) {
    console.error(`Error uploading ${fileType}:`, error);
    toast(`Error uploading ${fileType}.`);
  }
};

export const handleAddUpdate = async (projectId: string, newUpdate: string, project: Project, setUpdatedProject: (updates: Partial<Project>) => void) => {
  if (!newUpdate.trim() || !projectId) return;

  const update: Update = {
    id: project.updates.length + 1,
    title: newUpdate,
    date: new Date().toLocaleString(),
  };

  try {
    const docRef = doc(db, "projects", projectId);
    await updateDoc(docRef, {
      updates: arrayUnion(update),
    });

    setUpdatedProject({
      updates: [...project.updates, update],
    });

    toast("Update added successfully!");

    window.location.reload();
  } catch (error) {
    console.error("Error adding update:", error);
    toast("Error adding update.");
  }
};