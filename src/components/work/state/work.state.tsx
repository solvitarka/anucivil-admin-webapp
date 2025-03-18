'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Update, fetchProject, saveProject, handleFileUpload, handleAddUpdate } from '../services/work.service';

interface WorkContextType {
  project: Project | null;
  loading: boolean;
  error: string | null;
  isEditing: boolean;
  trackingLink: string;
  setProject: (project: Project) => void;
  setIsEditing: (isEditing: boolean) => void;
  setTrackingLink: (trackingLink: string) => void;
  saveProjectChanges: () => Promise<void>;
  uploadFile: (file: File, fileType: 'boq' | 'quotation' | 'report') => Promise<void>;
  addUpdate: (newUpdate: string) => Promise<void>;
}

const WorkContext = createContext<WorkContextType | undefined>(undefined);

export function WorkProvider({ children, projectId }: { children: ReactNode; projectId: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [trackingLink, setTrackingLink] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const projectData = await fetchProject(projectId);
        setProject(projectData);
        setTrackingLink(projectData.trackingLink || '');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching project');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  const saveProjectChanges = async () => {
    if (!project) return;
    
    try {
      await saveProject(projectId, project, trackingLink);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving project');
    }
  };

  const uploadFile = async (file: File, fileType: 'boq' | 'quotation' | 'report') => {
    if (!project) return;
    
    try {
      const downloadURL = await handleFileUpload(file, fileType, projectId);
      
      // Update the project with the new file URL
      const updatedProject = { ...project };
      if (fileType === 'boq') {
        updatedProject.customBoqUrl = downloadURL;
      } else if (fileType === 'quotation') {
        updatedProject.quotationUrl = downloadURL;
      } else if (fileType === 'report') {
        updatedProject.reportUrl = downloadURL;
      }
      
      setProject(updatedProject);
    } catch (err) {
      setError(err instanceof Error ? err.message : `An error occurred while uploading ${fileType}`);
    }
  };

  const addUpdate = async (newUpdate: string) => {
    if (!project) return;
    
    try {
      const updateObj = await handleAddUpdate(projectId, newUpdate);
      
      // Update the project with the new update
      const updatedProject = { 
        ...project, 
        updates: [...project.updates, updateObj] 
      };
      
      setProject(updatedProject);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while adding update');
    }
  };

  return (
    <WorkContext.Provider 
      value={{ 
        project, 
        loading, 
        error, 
        isEditing, 
        trackingLink,
        setProject, 
        setIsEditing, 
        setTrackingLink,
        saveProjectChanges,
        uploadFile,
        addUpdate
      }}
    >
      {children}
    </WorkContext.Provider>
  );
}

export function useWork() {
  const context = useContext(WorkContext);
  if (context === undefined) {
    throw new Error('useWork must be used within a WorkProvider');
  }
  return context;
} 