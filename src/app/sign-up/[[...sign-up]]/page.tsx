import { SignUp } from "@clerk/nextjs";
import {dark} from '@clerk/themes'
 
export default function Page() {
  return (
    <div className="w-100 flex justify-center h-[100vh] flex-wrap content-center">
      <SignUp appearance={{baseTheme: dark}} />
    </div>
  )
}