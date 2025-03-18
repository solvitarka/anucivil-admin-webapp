'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, OverviewData, fetchProjects } from '../services/dashboard.service';

interface DashboardContextType {
  projects: Project[];
  overviewData: OverviewData;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [overviewData, setOverviewData] = useState<OverviewData>({
    amountReceived: 0,
    amountDue: 0,
    inProgress: 0,
    inLab: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [projectsData, overview] = await fetchProjects();
      setProjects(projectsData);
      setOverviewData(overview);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <DashboardContext.Provider value={{ projects, overviewData, loading, error, refreshData }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
} 