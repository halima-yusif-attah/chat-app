'use client'

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../../firebase'
import { useRouter } from "next/navigation"
import getRecipientEmail from "../../utils/getReceipientEmail"
import { useSidebar } from "@/context/useSidebarContext"
import { cn } from "@/lib/utils"


const Chat = ({ id, users, activeChatId, setActiveChatId }) => {
  
  const router = useRouter()
  const [user] = useAuthState(auth)
  const recipientEmail = getRecipientEmail(users, user)
  const { showSidebar } = useSidebar();

  const isActive = activeChatId === id;
 

  const enterChat = () => {
    router.push(`/chats/${id}`)
    showSidebar()
    setActiveChatId(id);
  }


    return (
    <div className={cn("flex items-center p-[15px] break-words cursor-pointer hover:bg-gray-400", isActive ? "bg-[#397846] text-white" : "")} onClick={enterChat}>  
        <p>{recipientEmail}</p>
    </div>
  )
}

export default Chat














