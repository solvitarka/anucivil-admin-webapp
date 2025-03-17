import { collection, getDocs } from "firebase/firestore";
import { db } from '@/config/firebase/firebaseConfig';

export interface Project {
  id: string;
  name: string;
  location: string;
  status: string;
  paymentReceived: number;
  paymentDue: number;
  [key: string]: any; // for other properties
}

export interface OverviewData {
  amountReceived: number;
  amountDue: number;
  inProgress: number;
  inLab: number;
}

export const fetchProjects = async (): Promise<[Project[], OverviewData]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projectsData: Project[] = [];
    const overviewData: OverviewData = {
      amountReceived: 0,
      amountDue: 0,
      inProgress: 0,
      inLab: 0,
    };

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      projectsData.push({ 
        id: doc.id, 
        name: data.name || '',
        location: data.location || '',
        status: data.status || '',
        paymentReceived: Number(data.paymentReceived) || 0,
        paymentDue: Number(data.paymentDue) || 0,
        ...data 
      });
      
      overviewData.amountReceived += Number(data.paymentReceived) || 0;
      overviewData.amountDue += Number(data.paymentDue) || 0;
      
      if (['Sampling In Process', 'Quotation Accepted', 'Sent To Lab', 'reportReviewRequired'].includes(data.status)) {
        overviewData.inProgress += 1;
      }
      
      if (data.status === 'Sent To Lab') {
        overviewData.inLab += 1;
      }
    });

    return [projectsData, overviewData];
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}; 