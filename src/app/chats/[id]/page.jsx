import {  collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import ChatMessages from '@/components/ChatMessages'
import { db } from '../../../../firebase'


async function getChatData(id) { 
  const ref = doc(collection(db, 'chats'), id)

  const messageQuery = query(collection(ref, 'messages'), orderBy('timestamp', 'asc'))
  const messagesRes = await getDocs(messageQuery)

  const messages = messagesRes.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })).map((messages => ({
    ...messages,
    timestamp: messages.timestamp.toDate().getTime(),
  })))



  const chatRes = await getDoc(ref);
  const chat = {
    id: chatRes.id,
   ...chatRes.data(),
  }

  return { 
      messages: messages,
      chat: chat,
  }
 
}

export default async function ChatPage({params}) {
  const {id} =  await params;
  const chatData = await getChatData(id);
  
  return (
    <>
      <ChatMessages {...chatData}/> 
      
    </>
  )
}



