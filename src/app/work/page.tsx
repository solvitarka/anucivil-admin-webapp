"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import withAuth from '@/components/withAuth';
import WorkPageContent from "@/components/workPage/WorkPageContent";

const WorkPage: React.FC = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');

  if (!projectId) {
    return <p>No project ID provided</p>;
  }

  return <WorkPageContent projectId={projectId} />;
}

export default withAuth(WorkPage);