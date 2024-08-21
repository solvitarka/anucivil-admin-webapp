// src/types/Project.ts
export interface Project {
    id?: string;
    name: string;
    location: string;
    area: number | null;
    boreHoleDepth: number | null;
    boreHoles:number | null;
    customBoQ: boolean;
    isOwnerDifferent: boolean;
    ownerName: string;
    ownerPhone: string;
    paymentDue: number | null;
    paymentReceived: number | null;
    priority: boolean;
    remarks: string;
    selectedServices: string[];
    status: string;
    updates: { date: string; id: number; title: string }[];
    customBoqUrl?: string;
    quotationUrl?: string;
    reportUrl?: string;
    trackingLink: string | "";
  }
  