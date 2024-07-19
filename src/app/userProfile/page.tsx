"use client";


// import { IBM_Plex_Sans } from 'next/font/google'
// import { Libre_Franklin } from 'next/font/google'

// IBM_Plex_Sans({
//   subsets: ['latin'],
//   display: 'swap',
//   weight: '100'
// })

// Libre_Franklin({
//   subsets: ['latin'],
//   display: 'swap',
// })

// import HomeTable from "@/components/dashboard/HomeTable";
import InfoTable from "@/components/dashboard/InfoTable";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase/firebaseConfig";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
interface IconProps extends React.SVGProps<SVGSVGElement> {}
import { useRouter,usePathname, useSearchParams } from "next/navigation";
import { collection, query, where, getDocs,  } from "firebase/firestore";
import HomeTable from "@/components/dashboard/HomeTable";
import withAuth from '@/components/withAuth';
// import { db } from '../../lib/firebase/firebaseConfig';


const UserProfilePage: React.FC = () => {

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const [user, setUser] = useState<any>(null);
  const [userRef, setUserRef] = useState<any>(null);
  const [amountRecieved, setAmountRecieved] = useState<any>(0);
  const [amountDue, setAmountDue] = useState<any>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading1, setLoading1] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!userId) return;

      try {
        const docRef = doc(db, "users", userId);
        setUserRef(docRef);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userId]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!userRef) return;

      try {
        const q = query(collection(db, "projects"), where("userID", "==", userRef));
        const querySnapshot = await getDocs(q);
        const projectsData: any[] = [];
        querySnapshot.forEach((doc) => {
          projectsData.push({ id: doc.id, ...doc.data() });
          setAmountRecieved(amountRecieved+doc.data().paymentReceived);
          setAmountDue(amountDue+doc.data().paymentDue);
        });
        console.log("Fetched projects data:", projectsData); // Debug statement
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading1(false);
      }
    };

    fetchProjects();
  }, [userRef]);

  if (loading || loading1) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No User found</p>;
  }





  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Avatar className="h-16 w-16 md:h-20 md:w-20">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>VV</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold md:text-3xl">{user.name}</h1>
            <div className="text-sm text-primary-foreground/80 md:text-base">{user.address.district}</div>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-5xl mx-auto p-4 md:p-6 grid gap-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-2">
            <h2 className="text-lg font-semibold">Payment Received</h2>
            <div className="text-4xl font-bold">₹{amountRecieved}</div>
          </div>
          <div className="grid gap-2">
            <h2 className="text-lg font-semibold">Payment Due</h2>
            <div className="text-4xl font-bold">₹{amountDue}</div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <h2 className="text-lg font-semibold">Contact</h2>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <MailOpenIcon className="w-5 h-5 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <h2 className="text-lg font-semibold">Address</h2>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-muted-foreground" />
                <span>{user.address.street}</span>
              </div>
              <div className="flex items-center gap-2">
                <LocateIcon className="w-5 h-5 text-muted-foreground" />
                <span>{`${user.address.district},${user.address.town},${user.address.state}-${user.address.pincode}`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <h2 className="text-lg font-semibold">Current Projects</h2>
          <div className="overflow-auto border rounded-lg">
          <HomeTable data={projects} timeRange={'week'} />
           
          </div>
        </div>
      </main>
      
    </div>
  )
}

function FolderIcon(props: IconProps) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
      </svg>
    );
  }


  function LocateIcon(props: IconProps) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="2" x2="5" y1="12" y2="12" />
        <line x1="19" x2="22" y1="12" y2="12" />
        <line x1="12" x2="12" y1="2" y2="5" />
        <line x1="12" x2="12" y1="19" y2="22" />
        <circle cx="12" cy="12" r="7" />
      </svg>
    );
  }

function MailOpenIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
      <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
    </svg>
  );
}

function MapPinIcon(props: IconProps) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }
  

  function PhoneIcon(props: IconProps) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }

  function XIcon(props: IconProps) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    );
  }

  export default withAuth(UserProfilePage);