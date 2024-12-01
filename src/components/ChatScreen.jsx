'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, serverTimestamp, addDoc, where, updateDoc } from "firebase/firestore"
import { useState, useEffect } from 'react';
import Message from './Message'
import Timeago from 'react-timeago';
import { ListIcon, Mic, MoreVerticalIcon } from 'lucide-react';
import getRecipientEmail from '../../utils/getReceipientEmail';
import { auth, db } from '../../firebase';
import { IoMdAttach } from "react-icons/io";


const  ChatScreen = ({chat, messages}) => {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState('')
  
  const chatId = chat.id;
  const router = useRouter();
 
  
  
   const [usersRecipientSnapshot] = useCollection(
    query(
      collection(db, 'users'),
    where("uid", "!=", user.uid))
    )

  const usersSnaphots = usersRecipientSnapshot?.docs?.[0]?.data();
  
  
 

  const sendMessage = async (e) => {
    e.preventDefault();

    const messagesRef = collection(db, 'chats', chatId, 'messages');
       
    try {
      await addDoc(messagesRef, {
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL
      })

      messages.push({
        timestamp: serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photoURL
      })

    } catch (error) {
      console.error('Error sending message:', error);
    }
    setInput("");
    router.refresh();
  }

  const recipientEmail = getRecipientEmail(chat.clients, user)

 
  return (
    <div className='relative'>
        <div className="sticky bg-white z-100 flex p-[11px] h-[80px] items-center border-b border-whitesmoke">
          { (usersSnaphots?.email === getRecipientEmail(chat.clients, user)) &&
          (
            <Avatar>
  <AvatarImage src={usersSnaphots?.photo} />
  <AvatarFallback>{usersSnaphots.email[0]}</AvatarFallback>
</Avatar>

          )
       
        } 
          <div className='ml-[15px] flex-1'>
            <h3 className='mb-[3px] sm:mb-[3px] sm:text-[12px]'>{recipientEmail}</h3>
            {(usersSnaphots?.email === getRecipientEmail(chat.clients, user))? 
            <p className="text-[14px] text-gray-500 sm:text-[8px]">Last active {<Timeago date={new Date(usersSnaphots?.lastSeen.seconds*1000)}/>}</p> : "Unavailable"}
            
          </div>
         
          <div className="flex justify-center sm:hidden md:hidden lg:hidden xl:hidden">
              <IoMdAttach />
              <MoreVerticalIcon />
          </div>
        </div>

        <div className="h-[90vh] bg-[#e5ded8] p-[30px] overflow-y-scroll">
          
   
          <>
          {messages.map((message, i) => (
            <>
        <Message
        key={message.id? message.id : i}
        user={message.user}
        
        message={{
          text: message.message,
          timestamp:  message.timestamp? new Date(message.timestamp): null
          
        }}
        />

        </>
      ))}
      </>

          <div/>
        </div>
        <form className="flex items-center p-[10px] sticky bottom-0 bg-white z-[100]">
          <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 border-0 outline-none bg-[whitesmoke] mx-4 p-5 rounded-lg" />
          <button hidden disabled={!input} type="submit" onClick={sendMessage} >Send Message</button>
          <Mic />
        </form>
    </div>
  )
}

export default ChatScreen



