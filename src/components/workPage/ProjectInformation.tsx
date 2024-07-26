import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statuses = [
  "reportReceived",
  "Sampling In Process",
  "Action Required",
  "Quotation Accepted",
  "Sent To Lab",
  "reportShipped",
  "Quotation Sent",
  "Quotation Requested",
  "quotationReviewRequired",
  "reportReviewRequired"
];

interface ProjectInformationProps {
  project: any;
  setProject: React.Dispatch<React.SetStateAction<any>>;
  isEditing: boolean;
}

const ProjectInformation: React.FC<ProjectInformationProps> = ({ project, setProject ,isEditing}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject({ ...project, [e.target.id]: e.target.value });
  };

  const handleStatusChange = (newStatus: string) => {
    setProject({ ...project, status: newStatus });
  };

  const handleSwitchChange = (id: string, checked: boolean) => {
    setProject({ ...project, [id]: checked });
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl">Project Information</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input id="name" value={project.name} onChange={handleInputChange} className="mt-1"  disabled={!isEditing} />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={project.location} onChange={handleInputChange} className="mt-1" disabled={!isEditing} />
          </div>
          <div>
            <Label htmlFor="area">Area (sqm)</Label>
            <Input id="area" type="number" value={project.area} onChange={handleInputChange} className="mt-1" disabled={!isEditing}/>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={handleStatusChange} defaultValue={project.status}>
              <SelectTrigger className="w-full" disabled={!isEditing}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="boreHoleDepth">Bore Hole Depth (m)</Label>
            <Input id="boreHoleDepth" type="number" value={project.boreHoleDepth} onChange={handleInputChange} className="mt-1" disabled={!isEditing}/>
          </div>
          <div>
            <Label htmlFor="boreHoles">Number of Bore Holes</Label>
            <Input id="boreHoles" type="number" value={project.boreHoles} onChange={handleInputChange} className="mt-1" disabled={!isEditing} />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2" >
            <Switch id="customBoQ" checked={project.customBoQ} onCheckedChange={(checked) => handleSwitchChange("customBoQ", checked)} disabled={!isEditing}/>
            <Label htmlFor="customBoQ">Custom BoQ</Label>
          </div >
          <div className="flex items-center space-x-2">
            <Switch id="priority" checked={project.priority} onCheckedChange={(checked) => handleSwitchChange("priority", checked)} disabled={!isEditing} />
            <Label htmlFor="priority">Priority Project</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectInformation;