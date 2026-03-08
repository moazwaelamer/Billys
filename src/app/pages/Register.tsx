import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export function Register() {

const [name,setName] = useState("")
const [phone,setPhone] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate()

const handleRegister = (e:React.FormEvent)=>{

e.preventDefault()

const cleanName = name.trim()
const cleanPhone = phone.trim()
const cleanEmail = email.trim()

/* CHECK EMPTY */

if(!cleanName || !cleanPhone || !cleanEmail || !password){
toast.error("Please fill all fields")
return
}

/* PASSWORD VALIDATION */

if(password.length < 6){
toast.error("Password must be at least 6 characters")
return
}

/* PHONE VALIDATION */

if(cleanPhone.length < 10){
toast.error("Invalid phone number")
return
}

/* GET STORED USERS */

let accounts:any[] = []

try{

const stored = localStorage.getItem("userAccount")

accounts = stored ? JSON.parse(stored) : []

}catch{

accounts = []

}

/* CHECK EMAIL */

const existing = accounts.find((acc:any)=>acc.email === cleanEmail)

if(existing){
toast.error("Email already registered")
return
}

/* CREATE USER */

const newUser = {

id: Date.now(),

name: cleanName,
phone: cleanPhone,
email: cleanEmail,
password,

xp:0,
rank:"Bronze",

level:1,

totalBookings:0,
hoursPlayed:0,

createdAt: new Date().toISOString(),

tournaments:{
fifa:{played:0,wins:0,losses:0,rank:"Unranked"},
mortal:{played:0,wins:0,losses:0,rank:"Unranked"},
cod:{played:0,wins:0,losses:0,rank:"Unranked"}
}

}

/* SAVE */

accounts.push(newUser)

localStorage.setItem("userAccount",JSON.stringify(accounts))

localStorage.setItem("userProfile",JSON.stringify(newUser))

toast.success("Account created successfully 🎮")

navigate("/profile")

}

return(

<div className="min-h-screen flex items-center justify-center bg-zinc-950">

<form
onSubmit={handleRegister}
className="p-8 bg-white/5 border border-white/10 rounded-xl w-full max-w-md space-y-4"
>

<h2 className="text-3xl font-bold text-white text-center">
Create Account
</h2>

<input
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full px-3 py-3 bg-black/20 border border-white/20 text-white rounded"
/>

<input
placeholder="Phone Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
className="w-full px-3 py-3 bg-black/20 border border-white/20 text-white rounded"
/>

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
Create Account
</button>

<p className="text-center text-gray-400 text-sm">

Already have an account?

<Link
to="/login"
className="text-primary ml-2 font-semibold hover:underline"
>

Login

</Link>

</p>

</form>

</div>

)

}