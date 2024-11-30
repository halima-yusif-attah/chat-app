'use client'

import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from '../../firebase'
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, where, query, doc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import getRecipientEmail from "../../utils/getReceipientEmail"
import { useSidebar } from "@/context/useSidebarContext"



const Chat = ({ id, users }) => {
  
  const router = useRouter()
  const [user] = useAuthState(auth)
  const recipientEmail = getRecipientEmail(users, user)
  const { showSidebar } = useSidebar();
  

  const [recipientSnapshot] = useCollection(
    query(
      collection(db, 'chats'),
    where('clients', "array-contains", getRecipientEmail(users, user))
    )
)

  const [usersRecipientSnapshot] = useCollection(
    query(
      collection(db, 'users'),
    where("uid", "!=", user.uid))
    )



  const enterChat = () => {
    router.push(`/chats/${id}`)
    showSidebar()
  }
 
 
  const usersSnaphots = usersRecipientSnapshot?.docs?.[0]?.data();
  console.log("usersSnaphots", usersSnaphots);

    return (
    <div className="flex items-center p-[15px] break-words cursor-pointer hover:bg-[#e9eaeb]" onClick={enterChat}>
      
        <p>{recipientEmail}</p>
    </div>
  )
}

export default Chat














