'use client';

import WorkPage from '@/components/work/page';
import { useParams } from 'next/navigation';

export default function WorkDetail() {
  const params = useParams();
  const projectId = params.id as string;
  
  return <WorkPage projectId={projectId} />;
} 