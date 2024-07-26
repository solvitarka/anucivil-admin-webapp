import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FinancialDetailsProps {
  project: any;
  setProject: React.Dispatch<React.SetStateAction<any>>;
  isEditing: boolean;
}

const FinancialDetails: React.FC<FinancialDetailsProps> = ({ project, setProject,isEditing }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject({ ...project, [e.target.id]: e.target.value });
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
            <Input id="paymentDue" type="number" value={project.paymentDue} onChange={handleInputChange} className="mt-1" disabled={!isEditing}/>
          </div>
          <div>
            <Label htmlFor="paymentReceived">Payment Received</Label>
            <Input id="paymentReceived" type="number" value={project.paymentReceived} onChange={handleInputChange} className="mt-1" disabled={!isEditing} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialDetails;