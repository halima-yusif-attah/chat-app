"use client"

import * as EmailValidator from "email-validator"
import { collection, addDoc, query, where } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from './Chat';
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, MoreHorizontal, MoreVerticalIcon, Search } from "lucide-react";
import { auth, db } from "../../firebase";
import { useState } from "react";



const Sidebar = ({show}) => {

const [user] = useAuthState(auth);
const [filterText, setFilterText] = useState("")

  const userChatRef = query(
    collection(db, 'chats'),
    where('clients', 'array-contains', user.email) 
  );
  const [chatsSnapshot] = useCollection(userChatRef);

  
  const createChat = () => {
    const input = prompt('Please enter an email address for the user you wish to chat with')
  
    if (!input) {
      throw new Error(`Input filed can't be empty`)
    };

    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
      addDoc(collection(db, 'chats'), {
        clients: [user.email, input]
      })
    }
  
  }

  const chatAlreadyExists = (recipientEmail) => 
    !!chatsSnapshot.docs?.find(
      chat => chat.data().clients.find((user) => user === recipientEmail)?.length > 0
    )

  const handleSearch = (e) => {
    const text= e.target.value.toLowerCase();
    setFilterText(text);
  }
  

  return (
    <aside show={show ? "visible" : "hidden"} className="flex-[0.45] border-r border-whitesmoke h-screen min-w-[330px] max-w-[350px] overflow-y-scroll bg-white no-scrollbar">
      
        <div className="flex sticky top-0 bg-white z-10 justify-between items-center p-[15px] h-[80px] border-b border-whitesmoke">
            
                <Avatar onClick={() => auth.signOut()}>
  <AvatarImage src={user.photoURL}  />
  <AvatarFallback>{user.email[0]}</AvatarFallback>
</Avatar>
 
            <div className="flex space-x-2 items-center">     
                  <MessageSquare />
                  <MoreVerticalIcon/>  
            </div>
        </div>

        <div className="p-2 flex flex-col items-center space-y-4 mt-5">
        <div className="flex items-center p-20px space-x-2 border border-slate-300 rounded-md w-full p-2"   >
            <Search size={20} color="text-muted-foreground" />
            <input placeholder='Search in chats' className="outline-none border-0 flex-1 " onChange={handleSearch}/>
        </div>

       
        <Button variant="outline" onClick={createChat} className="w-full p-2  text-sm text-muted-foreground">Start a new chat</Button>
       </div>

       {chatsSnapshot?.docs
      .filter((chat) => {
        if (!filterText) return true; 
        return chat
          .data()
          .clients.some((client) =>
            client.toLowerCase().includes(filterText)
          );
      }).map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().clients} />
       )
        
       )}
       
    </aside>
  )
}

export default Sidebar





