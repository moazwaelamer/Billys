import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export function Login() {

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate()
const location = useLocation() as any

const handleSubmit = (e:React.FormEvent) => {

e.preventDefault()

if(!email || !password){
toast.error("Please fill all fields")
return
}

/* GET ACCOUNTS */

const stored = localStorage.getItem("userAccount")

if(!stored){

toast.error("No accounts found. Please register.")

navigate("/register")

return

}

/* PARSE USERS */

let accounts:any[] = []

try{

accounts = JSON.parse(stored)

}catch{

accounts = []

}

/* ENSURE ARRAY */

if(!Array.isArray(accounts)){
accounts = [accounts]
}

/* FIND USER */

const user = accounts.find((acc:any)=>acc.email === email)

if(!user){

toast.error("Account not found")

return

}

/* CHECK PASSWORD */

if(user.password !== password){

toast.error("Incorrect password")

return

}

/* LOGIN SUCCESS */

localStorage.setItem("userProfile",JSON.stringify(user))

toast.success(`Welcome back ${user.name} 🎮`)

if(location.state?.redirectTo){

navigate(location.state.redirectTo,{
state:location.state.bookingData
})

}else{

navigate("/profile")

}

}

return(

<div className="min-h-screen flex items-center justify-center bg-zinc-950">

<form
onSubmit={handleSubmit}
className="p-8 bg-white/5 border border-white/10 rounded-xl w-full max-w-md space-y-4"
>

<h2 className="text-3xl font-bold text-white text-center">
Login
</h2>

<input
type="email"
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full px-3 py-3 bg-black/20 border border-white/20 text-white rounded"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full px-3 py-3 bg-black/20 border border-white/20 text-white rounded"
/>

<button
type="submit"
className="w-full py-3 bg-primary text-white font-bold rounded hover:bg-red-700 transition"
>

Sign In

</button>

<p className="text-center text-gray-400 text-sm">

Don't have an account?

<Link
to="/register"
className="text-primary ml-2 font-semibold hover:underline"
>

Register

</Link>

</p>

</form>

</div>

)

}