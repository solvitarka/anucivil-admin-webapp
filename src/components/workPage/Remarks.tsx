import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RemarksProps {
  project: any;
  setProject: React.Dispatch<React.SetStateAction<any>>;
  isEditing: boolean;
}

const Remarks: React.FC<RemarksProps> = ({ project, setProject,isEditing }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProject({ ...project, remarks: e.target.value });
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl">Remarks</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Textarea id="remarks" value={project.remarks} onChange={handleInputChange} className="min-h-[100px]" disabled={!isEditing} />
      </CardContent>
    </Card>
  );
};

export default Remarks;