'use client'

import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/context/useSidebarContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";


export default function Home() {
  const { show } = useSidebar();
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
    router.push("/login")
  }
  }, [user, router])
  


  return (
   <main>
   
    <Sidebar show={show}/>
   </main>
  );
}
