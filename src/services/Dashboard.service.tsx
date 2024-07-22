import { collection, getDocs } from "firebase/firestore";
import { db } from '../lib/firebase/firebaseConfig';

export interface OverviewData {
  amountReceived: number;
  amountDue: number;
  inProgress: number;
  inLab: number;
}

export const fetchProjects = async (): Promise<[any[], OverviewData]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projectsData: any[] = [];
    const overviewData: OverviewData = {
      amountReceived: 0,
      amountDue: 0,
      inProgress: 0,
      inLab: 0,
    };

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      projectsData.push({ id: doc.id, ...data });
      
      overviewData.amountReceived += data.paymentReceived;
      console.log(overviewData);
      overviewData.amountDue += data.paymentDue;
      
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