"use client";
import React, { useRef, useEffect, useState } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, storage } from "../../lib/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import withAuth from '@/components/withAuth';


import { ChevronLeft, PlusCircle, Upload, Save, FileText, Link as LinkIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WorkPage: React.FC = () =>  {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const quotationInputRef = useRef<HTMLInputElement>(null);
  const reportInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newUpdate, setNewUpdate] = useState<string>("");
  const [trackingLink, setTrackingLink] = useState<string>("");
  


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

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) {
        console.error("No project ID provided");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
          setTrackingLink(docSnap.data().trackingLink || "");
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!project) {
    return <p>No project found</p>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProject({ ...project, [e.target.id]: e.target.value });
  };

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus !== project.status) {
      const update = {
        date: new Date().toLocaleString(),
        id: project.updates.length + 1,
        title: `Status changed to ${newStatus}`
      };

      try {
        const docRef = doc(db, "projects", projectId!);
        await updateDoc(docRef, {
          status: newStatus,
          updates: arrayUnion(update)
        });

        setProject({
          ...project,
          status: newStatus,
          updates: [...project.updates, update]
        });

        alert("Status updated successfully!");
      } catch (error) {
        console.error("Error updating status:", error);
        alert("Error updating status.");
      }
    }
  };

  const handleSwitchChange = (id: string, checked: boolean) => {
    setProject({ ...project, [id]: checked });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, fileType: 'boq' | 'quotation' | 'report') => {
    const file = event.target.files?.[0];
    if (!file || !projectId) return;

    const storageRef = ref(storage, `projects/${projectId}/${fileType}/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      const docRef = doc(db, "projects", projectId);
      let updateObj = {};
      if (fileType === 'boq') {
        updateObj = { customBoqUrl: downloadURL };
      } else if (fileType === 'quotation') {
        updateObj = { quotationUrl: downloadURL };
      } else if (fileType === 'report') {
        updateObj = { reportUrl: downloadURL };
      }
      
      await updateDoc(docRef, updateObj);

      setProject({ ...project, ...updateObj });
      alert(`${fileType.charAt(0).toUpperCase() + fileType.slice(1)} uploaded successfully!`);
    } catch (error) {
      console.error(`Error uploading ${fileType}:`, error);
      alert(`Error uploading ${fileType}.`);
    }
  };

  const handleAddUpdate = async () => {
    if (!newUpdate.trim() || !projectId) return;

    const update = {
      date: new Date().toLocaleString(),
      id: project.updates.length + 1,
      title: newUpdate
    };

    try {
      const docRef = doc(db, "projects", projectId);
      await updateDoc(docRef, {
        updates: arrayUnion(update)
      });

      setProject({
        ...project,
        updates: [...project.updates, update]
      });

      setNewUpdate("");
      alert("Update added successfully!");
    } catch (error) {
      console.error("Error adding update:", error);
      alert("Error adding update.");
    }
  };

  const handleSaveProject = async () => {
    if (!projectId) return;

    try {
      const docRef = doc(db, "projects", projectId);
      await updateDoc(docRef, {
        name: project.name,
        location: project.location,
        area: project.area,
        boreHoleDepth: project.boreHoleDepth,
        boreHoles: project.boreHoles,
        customBoQ: project.customBoQ,
        isOwnerDifferent: project.isOwnerDifferent,
        ownerName: project.ownerName,
        ownerPhone: project.ownerPhone,
        paymentDue: project.paymentDue,
        paymentReceived: project.paymentReceived,
        priority: project.priority,
        remarks: project.remarks,
        selectedServices: project.selectedServices,
        status: project.status,
        trackingLink: trackingLink,
      });
      alert("Project updated successfully!");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Error updating project.");
    }
  };

  const handleTrackingLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingLink(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <main className="container mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => router.back()}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">Work Details</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.back()}>Discard</Button>
            <Button onClick={handleSaveProject} className="bg-blue-600 hover:bg-blue-700">
              <Save className="mr-2 h-4 w-4" /> Save Project
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-xl">Project Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Project Name</Label>
                    <Input id="name" value={project.name} onChange={handleInputChange} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={project.location} onChange={handleInputChange} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="area">Area (sqm)</Label>
                    <Input id="area" type="number" value={project.area} onChange={handleInputChange} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select onValueChange={handleStatusChange} defaultValue={project.status}>
                      <SelectTrigger className="w-full">
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
                    <Input id="boreHoleDepth" type="number" value={project.boreHoleDepth} onChange={handleInputChange} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="boreHoles">Number of Bore Holes</Label>
                    <Input id="boreHoles" type="number" value={project.boreHoles} onChange={handleInputChange} className="mt-1" />
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="customBoQ" checked={project.customBoQ} onCheckedChange={(checked) => handleSwitchChange("customBoQ", checked)} />
                    <Label htmlFor="customBoQ">Custom BoQ</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="priority" checked={project.priority} onCheckedChange={(checked) => handleSwitchChange("priority", checked)} />
                    <Label htmlFor="priority">Priority Project</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-xl">Financial Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="paymentDue">Payment Due</Label>
                    <Input id="paymentDue" type="number" value={project.paymentDue} onChange={handleInputChange} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="paymentReceived">Payment Received</Label>
                    <Input id="paymentReceived" type="number" value={project.paymentReceived} onChange={handleInputChange} className="mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-xl">Owner Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center space-x-2">
                  <Switch id="isOwnerDifferent" checked={project.isOwnerDifferent} onCheckedChange={(checked) => handleSwitchChange("isOwnerDifferent", checked)} />
                  <Label htmlFor="isOwnerDifferent">Different from Client</Label>
                </div>
                {project.isOwnerDifferent && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Label htmlFor="ownerName">Owner/Supervisor Name</Label>
                      <Input id="ownerName" value={project.ownerName} onChange={handleInputChange} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="ownerPhone">Owner/Supervisor Phone</Label>
                      <Input id="ownerPhone" value={project.ownerPhone} onChange={handleInputChange} className="mt-1" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-xl">Remarks</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Textarea id="remarks" value={project.remarks} onChange={handleInputChange} className="min-h-[100px]" />
              </CardContent>
            </Card>

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
                  />
                  <Button onClick={() => window.open(trackingLink, '_blank')} disabled={!trackingLink}>
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-xl">Document Uploads</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={(e) => handleFileUpload(e, 'boq')} />
                <Button onClick={() => fileInputRef.current?.click()} className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Upload BoQ
                </Button>
                
                <input type="file" ref={quotationInputRef} style={{ display: "none" }} onChange={(e) => handleFileUpload(e, 'quotation')} />
                <Button onClick={() => quotationInputRef.current?.click()} className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Upload Quotation
                </Button>
                
                <input type="file" ref={reportInputRef} style={{ display: "none" }} onChange={(e) => handleFileUpload(e, 'report')} />
                <Button onClick={() => reportInputRef.current?.click()} className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Upload Report
                </Button>
                
                <div className="mt-4 space-y-2">
                  <h3 className="font-semibold">Uploaded Documents:</h3>
                  {project.customBoqUrl && (
                    <div className="flex items-center justify-between">
                      <span>BoQ</span>
                      <Button variant="outline" size="sm" onClick={() => window.open(project.customBoqUrl, '_blank')}>
                        <FileText className="h-4 w-4 mr-2" /> View
                      </Button>
                    </div>
                  )}
                  {project.quotationUrl && (
                    <div className="flex items-center justify-between">
                      <span>Quotation</span>
                      <Button variant="outline" size="sm" onClick={() => window.open(project.quotationUrl, '_blank')}>
                        <FileText className="h-4 w-4 mr-2" /> View
                      </Button>
                    </div>
                  )}
                  {project.reportUrl && (
                    <div className="flex items-center justify-between">
                      <span>Report</span>
                      <Button variant="outline" size="sm" onClick={() => window.open(project.reportUrl, '_blank')}>
                        <FileText className="h-4 w-4 mr-2" /> View
                      </Button>
                    </div>
                  )}
                
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-xl">Project Updates</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Input placeholder="Enter new update" value={newUpdate} onChange={(e) => setNewUpdate(e.target.value)} />
                  <Button onClick={handleAddUpdate} className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Update
                  </Button>
                  <div className="mt-4 space-y-2">
                    {project.updates.map((update: any) => (
                      <div key={update.id} className="rounded-md bg-gray-100 p-3 text-sm">
                        <span className="font-semibold">{update.date}:</span> {update.title}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuth(WorkPage);