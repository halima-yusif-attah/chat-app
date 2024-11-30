"use client"


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FaGlobe } from "react-icons/fa";
import { auth, provider, signInWithPopup } from "../../../firebase";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";


function Login() {
    const router = useRouter();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in:", result.user);
        router.replace("/")

      })
      .catch((error) => {
        alert(error.message);
      });
  };


  return (
    <div className="bg-[#397846] h-[100vh] flex items-center justify-center">
     <Card className="md:h-auto md:w-[320px] p-8">
  <CardHeader className="px-0 pt-0">
    <CardTitle className="text-center text-xl text-muted-foreground">Sign In</CardTitle>
    
  </CardHeader>
  <CardContent className="px-0 flex flex-col space-y-8">
    <div className="flex place-items-center flex-col">
      <FaGlobe size={80} color="#2bf353" />
    </div>
  
 
    <Button variant="outline" onClick={signIn} className="my-4 w-full text-muted-foreground text-base" size="lg"> 
     <FcGoogle />
      Google</Button>
  </CardContent>
</Card>

      
    </div>
  )
}

export default Login