import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWork } from "../state/work.state";

const FinancialDetails: React.FC = () => {
  const { project, setProject, isEditing } = useWork();
  
  if (!project) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? null : Number(e.target.value);
    setProject({ ...project, [e.target.id]: value });
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl">Financial Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
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
        </div>
        {project.paymentDue !== null && project.paymentReceived !== null && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="font-medium">
              Balance: <span className={project.paymentDue - project.paymentReceived > 0 ? "text-red-500" : "text-green-500"}>
                ₹{(project.paymentDue - project.paymentReceived).toFixed(2)}
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialDetails; 