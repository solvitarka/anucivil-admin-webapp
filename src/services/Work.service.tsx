import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../lib/firebase/firebaseConfig";

export const fetchProject = async (projectId: string, setProject: Function, setLoading: Function, setTrackingLink: Function) => {
  try {
    const docRef = doc(db, "projects", projectId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const projectData = { id: docSnap.id, ...docSnap.data() };
      setProject(projectData);
      setTrackingLink(projectData.trackingLink || "");
    } else {
      console.error("No such document!");
    }
  } catch (error) {
    console.error("Error fetching project:", error);
  } finally {
    setLoading(false);
  }
};

export const saveProject = async (projectId: string, project: any, trackingLink: string) => {
  try {
    const docRef = doc(db, "projects", projectId);
    await updateDoc(docRef, {
      name: project.name,
      location: project.location,
      area: project.area,
      boreHoleDepth: project.boreHoleDepth,
      boreHoles: project.boreHoles,
      customBoQ: project.customBoQ,
      isOwnerDifferent: project.isOwnerDifferent,
      ownerName: project.ownerName,
      ownerPhone: project.ownerPhone,
      paymentDue: project.paymentDue,
      paymentReceived: project.paymentReceived,
      priority: project.priority,
      remarks: project.remarks,
      selectedServices: project.selectedServices,
      status: project.status,
      trackingLink: trackingLink,
    });
    alert("Project updated successfully!");
  } catch (error) {
    console.error("Error updating project:", error);
    alert("Error updating project.");
  }
};

export const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, fileType: 'boq' | 'quotation' | 'report', projectId: string, setProject: Function) => {
  const file = event.target.files?.[0];
  if (!file || !projectId) return;

  const storageRef = ref(storage, `projects/${projectId}/${fileType}/${file.name}`);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    const docRef = doc(db, "projects", projectId);
    let updateObj = {};
    if (fileType === 'boq') {
      updateObj = { customBoqUrl: downloadURL };
    } else if (fileType === 'quotation') {
      updateObj = { quotationUrl: downloadURL };
    } else if (fileType === 'report') {
      updateObj = { reportUrl: downloadURL };
    }
    
    await updateDoc(docRef, updateObj);

    setProject((prevProject: any) => ({ ...prevProject, ...updateObj }));
    alert(`${fileType.charAt(0).toUpperCase() + fileType.slice(1)} uploaded successfully!`);
  } catch (error) {
    console.error(`Error uploading ${fileType}:`, error);
    alert(`Error uploading ${fileType}.`);
  }
};

export const handleAddUpdate = async (projectId: string, newUpdate: string, project: any, setProject: Function) => {
  if (!newUpdate.trim() || !projectId) return;

  const update = {
    date: new Date().toLocaleString(),
    id: project.updates.length + 1,
    title: newUpdate
  };

  try {
    const docRef = doc(db, "projects", projectId);
    await updateDoc(docRef, {
      updates: arrayUnion(update)
    });

    setProject((prevProject: any) => ({
      ...prevProject,
      updates: [...prevProject.updates, update]
    }));

    alert("Update added successfully!");
  } catch (error) {
    console.error("Error adding update:", error);
    alert("Error adding update.");
  }
};