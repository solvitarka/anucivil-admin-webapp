import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OwnerInformationProps {
  project: any;
  setProject: React.Dispatch<React.SetStateAction<any>>;
  isEditing: boolean;
}

const OwnerInformation: React.FC<OwnerInformationProps> = ({ project, setProject,isEditing }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject({ ...project, [e.target.id]: e.target.value });
  };

  const handleSwitchChange = (checked: boolean) => {
    setProject({ ...project, isOwnerDifferent: checked });
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl">Owner Information</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center space-x-2">
          <Switch id="isOwnerDifferent" checked={project.isOwnerDifferent} onCheckedChange={handleSwitchChange} disabled={!isEditing} />
          <Label htmlFor="isOwnerDifferent">Different from Client</Label>
        </div>
        {project.isOwnerDifferent && (
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="ownerName">Owner/Supervisor Name</Label>
              <Input id="ownerName" value={project.ownerName} onChange={handleInputChange} className="mt-1" disabled={!isEditing}/>
            </div>
            <div>
              <Label htmlFor="ownerPhone">Owner/Supervisor Phone</Label>
              <Input id="ownerPhone" value={project.ownerPhone} onChange={handleInputChange} className="mt-1" disabled={!isEditing} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OwnerInformation;