"use client";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase/firebaseConfig";

import {
  ChevronLeft,
  PlusCircle,
  Upload,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter,usePathname, useSearchParams } from "next/navigation"; // Correct import for useRouter
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";

export default function WorkPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;

      try {
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject(docSnap.data());
          console.log(docSnap.data());
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

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log("Selected file:", files[0]);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 sm:py-4">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-6">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Work details
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Project</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Work Details</CardTitle>
                  <CardDescription>
                    Details of the project from work order
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        className="w-full"
                        defaultValue={project.name}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        defaultValue={project.location}
                        className="min-h-32"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                  <CardTitle>Project Requirements</CardTitle>
                  <CardDescription>
                    Requirements of work as per user request in quotation agreed.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Point</TableHead>
                        <TableHead>Descriptions</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead className="w-[100px]">Qty</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold">GGPC-001</TableCell>
                        <TableCell>
                          <Label htmlFor="stock-1" className="sr-only">
                            Stock
                          </Label>
                          <Input id="stock-1" type="number" defaultValue="100" />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="price-1" className="sr-only">
                            Price
                          </Label>
                          <Input id="price-1" type="number" defaultValue="99.99" />
                        </TableCell>
                        <TableCell>
                          <ToggleGroup type="single" defaultValue="s" variant="outline">
                            <ToggleGroupItem value="s">1</ToggleGroupItem>
                            <ToggleGroupItem value="m">2</ToggleGroupItem>
                            <ToggleGroupItem value="l">3</ToggleGroupItem>
                          </ToggleGroup>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold">GGPC-002</TableCell>
                        <TableCell>
                          <Label htmlFor="stock-2" className="sr-only">
                            Stock
                          </Label>
                          <Input id="stock-2" type="number" defaultValue="143" />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="price-2" className="sr-only">
                            Price
                          </Label>
                          <Input id="price-2" type="number" defaultValue="99.99" />
                        </TableCell>
                        <TableCell>
                          <ToggleGroup type="single" defaultValue="m" variant="outline">
                            <ToggleGroupItem value="s">1</ToggleGroupItem>
                            <ToggleGroupItem value="m">2</ToggleGroupItem>
                            <ToggleGroupItem value="l">3</ToggleGroupItem>
                          </ToggleGroup>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold">GGPC-003</TableCell>
                        <TableCell>
                          <Label htmlFor="stock-3" className="sr-only">
                            Stock
                          </Label>
                          <Input id="stock-3" type="number" defaultValue="32" />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="price-3" className="sr-only">
                            Price
                          </Label>
                          <Input id="price-3" type="number" defaultValue="99.99" />
                        </TableCell>
                        <TableCell>
                          <ToggleGroup type="single" defaultValue="s" variant="outline">
                            <ToggleGroupItem value="s">1</ToggleGroupItem>
                            <ToggleGroupItem value="m">2</ToggleGroupItem>
                            <ToggleGroupItem value="l">3</ToggleGroupItem>
                          </ToggleGroup>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="justify-center border-t p-4">
                  <Button size="sm" variant="ghost" className="gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add Variant
                  </Button>
                </CardFooter>
              </Card>

              <Card x-chunk="dashboard-07-chunk-2">
                <CardHeader>
                  <CardTitle>Upload Bill</CardTitle>
                  <CardDescription>
                    Upload Final bill for the work
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <Button onClick={handleButtonClick} size="sm">
                      <Upload className="mr-2 h-4 w-4" /> Upload Bill
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="hidden md:block">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Project Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Add notes for the project..."
                    defaultValue={project.notes}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
