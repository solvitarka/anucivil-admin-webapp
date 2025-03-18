import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";
import { useWork } from "../state/work.state";

const ProjectFiles: React.FC = () => {
  const { project, uploadFile, isEditing } = useWork();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const quotationInputRef = useRef<HTMLInputElement>(null);
  const reportInputRef = useRef<HTMLInputElement>(null);

  if (!project) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, fileType: 'boq' | 'quotation' | 'report') => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file, fileType);
      // Reset the input value so the same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl">Document Uploads</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: "none" }} 
          onChange={(e) => handleFileChange(e, 'boq')} 
          disabled={!isEditing} 
        />
        <Button 
          onClick={() => fileInputRef.current?.click()} 
          className="w-full" 
          disabled={!isEditing}
        >
          <Upload className="mr-2 h-4 w-4" /> Upload BoQ
        </Button>
        
        <input 
          type="file" 
          ref={quotationInputRef} 
          style={{ display: "none" }} 
          onChange={(e) => handleFileChange(e, 'quotation')} 
          disabled={!isEditing} 
        />
        <Button 
          onClick={() => quotationInputRef.current?.click()} 
          className="w-full" 
          disabled={!isEditing}
        >
          <Upload className="mr-2 h-4 w-4" /> Upload Quotation
        </Button>
        
        <input 
          type="file" 
          ref={reportInputRef} 
          style={{ display: "none" }} 
          onChange={(e) => handleFileChange(e, 'report')} 
          disabled={!isEditing} 
        />
        <Button 
          onClick={() => reportInputRef.current?.click()} 
          className="w-full" 
          disabled={!isEditing}
        >
          <Upload className="mr-2 h-4 w-4" /> Upload Report
        </Button>
        
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">Uploaded Documents:</h3>
          {project.customBoqUrl && (
            <div className="flex items-center justify-between">
              <span>BoQ</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => project.customBoqUrl && window.open(project.customBoqUrl, '_blank')}
              >
                <FileText className="h-4 w-4 mr-2" /> View
              </Button>
            </div>
          )}
          {project.quotationUrl && (
            <div className="flex items-center justify-between">
              <span>Quotation</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => project.quotationUrl && window.open(project.quotationUrl, '_blank')}
              >
                <FileText className="h-4 w-4 mr-2" /> View
              </Button>
            </div>
          )}
          {project.reportUrl && (
            <div className="flex items-center justify-between">
              <span>Report</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => project.reportUrl && window.open(project.reportUrl, '_blank')}
              >
                <FileText className="h-4 w-4 mr-2" /> View
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectFiles; 