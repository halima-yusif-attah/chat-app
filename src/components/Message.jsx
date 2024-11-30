
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase"
import TypeOfUser from "./TypeOfUser"

const Message = ({user, message}) => {
  const  [userLoggedIn] = useAuthState(auth)
  const router = useRouter();

 
  useEffect(() => {
    return router.refresh();
  }, [message, router])

  return (
    <div> 
      <TypeOfUser userLoggedIn={userLoggedIn} user={user} message={message} />
    </div>
  )
}

export default Message

