'use client';

import { useParams } from 'next/navigation';
import * as Routes from '@/components/routes';

export default function CatchAllPage() {
  const params = useParams();
  const path = Array.isArray(params.path) ? params.path : [params.path];
  
  // Handle root path
  if (!path[0]) {
    return <Routes.Home />;
  }

  // Map path to component
  switch (path[0]) {
    case 'dashboard':
      return <Routes.Dashboard />;
    case 'users':
      if (path.length > 1) {
        return <Routes.UserDetail key={path[1]} />;
      }
      return <Routes.Users />;
    case 'work':
      if (path.length > 1) {
        return <Routes.WorkDetail key={path[1]} />;
      }
      return <Routes.Work />;
    case 'userProfile':
      return <Routes.UserProfile />;
    case 'login':
      return <Routes.Login />;
    default:
      return <Routes.Home />;
  }
} 