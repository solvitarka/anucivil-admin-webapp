import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWork } from "../state/work.state";

const Remarks: React.FC = () => {
  const { project, setProject, isEditing } = useWork();
  
  if (!project) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProject({ ...project, remarks: e.target.value });
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl">Remarks</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Textarea 
          id="remarks" 
          value={project.remarks || ''} 
          onChange={handleInputChange} 
          className="min-h-[100px]" 
          disabled={!isEditing} 
          placeholder={isEditing ? "Add any additional notes or remarks here..." : "No remarks"}
        />
      </CardContent>
    </Card>
  );
};

export default Remarks; 