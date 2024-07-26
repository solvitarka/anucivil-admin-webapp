import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon } from "lucide-react";

interface TrackingLinkProps {
  trackingLink: string;
  setTrackingLink: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
}

const TrackingLink: React.FC<TrackingLinkProps> = ({ trackingLink, setTrackingLink , isEditing

 }) => {
  const handleTrackingLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingLink(e.target.value);
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl">Tracking Link</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2">
          <Input 
            placeholder="Enter tracking link" 
            value={trackingLink} 
            onChange={handleTrackingLinkChange} 
            className="flex-grow"
            disabled={!isEditing}
          />
          <Button onClick={() => window.open(trackingLink, '_blank')} disabled={!trackingLink} >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackingLink;