import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { handleAddUpdate } from "@/services/Work.service";

interface ProjectUpdatesProps {
  project: any;
  setProject: React.Dispatch<React.SetStateAction<any>>;
  projectId: string;
  isEditing: boolean;
}

const ProjectUpdates: React.FC<ProjectUpdatesProps> = ({ project, setProject, projectId, isEditing }) => {
  const [newUpdate, setNewUpdate] = useState<string>("");

  const addUpdate = async () => {
    await handleAddUpdate(projectId, newUpdate, project, setProject);
    setNewUpdate("");
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl">Project Updates</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <Input placeholder="Enter new update" value={newUpdate} onChange={(e) => setNewUpdate(e.target.value)} disabled={!isEditing} />
          <Button onClick={addUpdate} className="w-full" disabled={!isEditing}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Update
          </Button>
          <div className="mt-4 space-y-2">
            {project.updates.map((update: any) => (
              <div key={update.id} className="rounded-md bg-gray-100 p-3 text-sm">
                <span className="font-semibold">{update.date}:</span> {update.title}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectUpdates;