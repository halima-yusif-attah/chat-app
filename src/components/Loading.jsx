import { LucideLoaderCircle } from "lucide-react";
import { FaGlobe } from "react-icons/fa";

const Loading = () => {
  return (
    <center className="flex items-center justify-center h-[100vh] flex-col">
        <div>
            <FaGlobe size={80} color="#2bf353" className="mb-[5rem]"/>
        </div>
        <LucideLoaderCircle color="#3CBC28" size={60} className="animate-spin"/>
    </center>
  )
}

export default Loading