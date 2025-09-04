import { Button, Image } from "@chakra-ui/react"
import {useGoogleLogin} from '@react-oauth/google'

const GoogleInitBtn = () => {

    const VITE_GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI
    const state = crypto.randomUUID()
     sessionStorage.setItem('ZenfoceGRK', state)
    const googleInit = useGoogleLogin({
        flow: 'auth-code',
        redirect_uri: VITE_GOOGLE_REDIRECT_URI,
        ux_mode: 'redirect',
        state: state,
    })
   
    
   
  return (
    <Button onClick={googleInit}  mt='10px'  width='65%' smDown={{width: "90%"}} >
        <Image width='25px' src="./google.png" />
        Continue with Google
    </Button>
  )
}

export default GoogleInitBtn