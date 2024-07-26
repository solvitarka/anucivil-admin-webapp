// src/types/Project.ts
export interface Project {
    id: string;
    name: string;
    location: string;
    area: string;
    boreHoleDepth: string;
    boreHoles: string;
    customBoQ: string;
    isOwnerDifferent: boolean;
    ownerName: string;
    ownerPhone: string;
    paymentDue: string;
    paymentReceived: string;
    priority: boolean;
    remarks: string;
    selectedServices: string[];
    status: string;
    updates: { date: string; id: number; title: string }[];
    customBoqUrl?: string;
    quotationUrl?: string;
    reportUrl?: string;
    trackingLink?: string;
  }
  