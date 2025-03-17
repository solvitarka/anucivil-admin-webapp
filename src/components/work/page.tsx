'use client';

import { useParams } from 'next/navigation';
import { WorkProvider } from './state/work.state';
import ProjectInformation from './ui/ProjectInformation';
import OwnerInformation from './ui/OwnerInformation';
import ProjectFiles from './ui/ProjectFiles';
import ProjectUpdates from './ui/ProjectUpdates';
import TrackingLink from './ui/TrackingLink';
import Remarks from './ui/Remarks';
import FinancialDetails from './ui/FinancialDetails';
import { Button } from '@/components/ui/button';
import { useWork } from './state/work.state';

// This component will be wrapped by the WorkProvider
const WorkContent = () => {
  const { project, isEditing, setIsEditing, saveProjectChanges, loading, error } = useWork();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-lg">Loading project data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-md border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {project?.name ? `Work Order: ${project.name}` : 'Work Order Details'}
        </h1>
        <div className="space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={saveProjectChanges}>Save Changes</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <ProjectInformation />
        <OwnerInformation />
        <FinancialDetails />
        <ProjectFiles />
        <TrackingLink />
        <Remarks />
        <div className="md:col-span-2">
          <ProjectUpdates />
        </div>
      </div>
    </div>
  );
};

// This is the main page component that will be used by Next.js
interface WorkPageProps {
  projectId?: string;
}

export default function WorkPage({ projectId }: WorkPageProps) {
  // If projectId is not provided via props, try to get it from the URL params
  const params = useParams();
  const id = projectId || (params?.id as string);

  if (!id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 text-red-500 p-4 rounded-md border border-red-200">
          Project ID is missing
        </div>
      </div>
    );
  }

  return (
    <WorkProvider projectId={id}>
      <WorkContent />
    </WorkProvider>
  );
} 