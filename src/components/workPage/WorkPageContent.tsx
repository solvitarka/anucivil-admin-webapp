"use client";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectInformation from "./ProjectInformation";
import FinancialDetails from "./FinancialDetails";
import OwnerInformation from "./OwnerInformation";
import Remarks from "./Remarks";
import TrackingLink from "./TrackingLink";
import ProjectFiles from "./ProjectFiles";
import ProjectUpdates from "./ProjectUpdates";
import { fetchProject, saveProject } from "@/services/Work.service";

interface WorkPageContentProps {
  projectId: string;
}

const WorkPageContent: React.FC<WorkPageContentProps> = ({ projectId }) => {
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [trackingLink, setTrackingLink] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    fetchProject(projectId, setProject, setLoading, setTrackingLink);
  }, [projectId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!project) {
    return <p>No project found</p>;
  }

  const handleSaveProject = async () => {
    await saveProject(projectId, project, trackingLink);
    setIsEditing(false);
  };

  const handleDiscardChanges = () => {
    // Refetch the project data to discard changes
    fetchProject(projectId, setProject, setLoading, setTrackingLink);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <main className="container mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
          {isEditing ? (
              <>
                <Button variant="outline" onClick={handleDiscardChanges}>Discard</Button>
                <Button onClick={handleSaveProject} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="mr-2 h-4 w-4" /> Save Project
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                <Edit className="mr-2 h-4 w-4" /> Edit Project
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <ProjectInformation project={project} setProject={setProject} isEditing={isEditing} />
            <FinancialDetails project={project} setProject={setProject} isEditing={isEditing} />
            <OwnerInformation project={project} setProject={setProject} isEditing={isEditing} />
            <Remarks project={project} setProject={setProject} isEditing={isEditing} />
            <TrackingLink trackingLink={trackingLink} setTrackingLink={setTrackingLink} isEditing={isEditing} />
          </div>
          <div className="space-y-8">
            <ProjectFiles project={project} setProject={setProject} projectId={projectId} isEditing={isEditing} />
            <ProjectUpdates project={project} setProject={setProject} projectId={projectId} isEditing={isEditing} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default WorkPageContent;