import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [phone,setPhone] = useState("");

const handleRegister = () => {

const user = {

id: Date.now(),

name,

username: "@"+name.toLowerCase(),

phone,

avatar:
"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",

xp:0,
level:1,
rank:"Rookie",

bookings:0,
hoursPlayed:0,

tournaments:{
fifa:{played:0,wins:0,ranking:0},
mortal:{played:0,wins:0,ranking:0},
cod:{played:0,wins:0,ranking:0}
}

}

localStorage.setItem("userProfile",JSON.stringify(user))

navigate("/profile")

}

return(

<div>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Phone"
onChange={(e)=>setPhone(e.target.value)}
/>

<button onClick={handleRegister}>
Create Account
</button>

</div>

)

}