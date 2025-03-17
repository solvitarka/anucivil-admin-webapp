import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWork } from "../state/work.state";

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

const ProjectInformation: React.FC = () => {
  const { project, setProject, isEditing } = useWork();
  
  if (!project) return null;

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
            <Input id="name" value={project.name} onChange={handleInputChange} className="mt-1" disabled={!isEditing} />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={project.location} onChange={handleInputChange} className="mt-1" disabled={!isEditing} />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select 
              disabled={!isEditing}
              value={project.status} 
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="mt-1">
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
            <Label htmlFor="area">Area (in sq. ft.)</Label>
            <Input 
              id="area" 
              type="number" 
              value={project.area || ''} 
              onChange={handleInputChange} 
              className="mt-1"
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="boreHoles">Number of Bore Holes</Label>
            <Input 
              id="boreHoles" 
              type="number" 
              value={project.boreHoles || ''} 
              onChange={handleInputChange} 
              className="mt-1"
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="boreHoleDepth">Bore Hole Depth (in meters)</Label>
            <Input 
              id="boreHoleDepth" 
              type="number" 
              value={project.boreHoleDepth || ''} 
              onChange={handleInputChange} 
              className="mt-1"
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="paymentReceived">Payment Received</Label>
            <Input 
              id="paymentReceived" 
              type="number" 
              value={project.paymentReceived || ''} 
              onChange={handleInputChange} 
              className="mt-1"
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="paymentDue">Payment Due</Label>
            <Input 
              id="paymentDue" 
              type="number" 
              value={project.paymentDue || ''} 
              onChange={handleInputChange} 
              className="mt-1"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="priority" 
              checked={project.priority} 
              onCheckedChange={(checked) => handleSwitchChange('priority', checked)}
              disabled={!isEditing}
            />
            <Label htmlFor="priority">Priority Project</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch 
              id="customBoQ" 
              checked={project.customBoQ} 
              onCheckedChange={(checked) => handleSwitchChange('customBoQ', checked)}
              disabled={!isEditing}
            />
            <Label htmlFor="customBoQ">Custom BoQ</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectInformation; 