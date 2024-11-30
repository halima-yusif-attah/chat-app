'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
import { useSidebar } from '@/context/useSidebarContext'
import getRecipientEmail from '../../utils/getReceipientEmail'
import Sidebar from './Sidebar'
import ChatScreen from './ChatScreen'


const ChatMessages = ({ chat, messages }) => {
  const [user] = useAuthState(auth)
  const { show } = useSidebar();
  

  return (
    <div className='flex'>
        <Head>
            <title>Chat with {getRecipientEmail(chat.client, user) }</title>
        </Head>
        <Sidebar show={show} />
        <div className='flex-1 h-[100vh] overflow-scroll'>
          <ChatScreen chat={chat} messages={messages} />
        </div>
    </div>
  )
}

export default ChatMessages

