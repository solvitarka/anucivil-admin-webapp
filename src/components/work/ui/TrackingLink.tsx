import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon } from "lucide-react";
import { useWork } from "../state/work.state";

const TrackingLink: React.FC = () => {
  const { trackingLink, setTrackingLink, isEditing } = useWork();

  const handleTrackingLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingLink(e.target.value);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const openLink = () => {
    if (trackingLink && isValidUrl(trackingLink)) {
      window.open(trackingLink, '_blank');
    }
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
          <Button 
            onClick={openLink} 
            disabled={!trackingLink || !isValidUrl(trackingLink)}
            title={trackingLink ? "Open tracking link" : "No tracking link available"}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackingLink; 