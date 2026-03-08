import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Clock, Shield } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router-dom";

export function Profile() {

const [user,setUser] = useState<any>(null)

const loadUser = () => {

const savedUser = localStorage.getItem("userProfile")

if(savedUser){

const parsedUser = JSON.parse(savedUser)

setUser(parsedUser)

}

}

useEffect(()=>{

loadUser()

/* تحديث تلقائي لو localStorage اتغير */

window.addEventListener("storage",loadUser)

return ()=>{
window.removeEventListener("storage",loadUser)
}

},[])



/* لو مفيش تسجيل دخول */

if(!user){

return(

<div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white">

<h1 className="text-3xl font-bold mb-4">
No Profile Found
</h1>

<p className="text-gray-400 mb-6">
You need to login first to see your profile.
</p>

<Link
to="/login"
className="px-6 py-3 bg-primary text-white hover:bg-red-700 transition"
>
Go to Login
</Link>

</div>

)

}



/* RANK SYSTEM */

const ranks = [

{ level:0 , name:"Rookie" },
{ level:100 , name:"Player" },
{ level:200 , name:"Pro Gamer" },
{ level:400 , name:"Master" },
{ level:700 , name:"Legend" },
{ level:1000 , name:"Elite" }

]

const currentRank =
ranks
.slice()
.reverse()
.find(rank=>user.xp >= rank.level)



return(

<div className="pt-20 min-h-screen bg-zinc-950 text-white">


{/* HEADER */}

<section className="py-20 bg-black">

<div className="max-w-7xl mx-auto px-6">

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="flex flex-col md:flex-row items-center gap-8"
>


<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary">

<ImageWithFallback
src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
alt={user.name}
className="w-full h-full object-cover"
/>

</div>


<div>

<h1 className="text-4xl font-bold">
{user.name}
</h1>

<p className="text-gray-400">
@{user.name.toLowerCase()}
</p>

<div className="mt-4 flex items-center gap-3">

<Shield className="text-primary"/>

<span className="text-primary font-bold">
{currentRank?.name}
</span>

<span className="text-gray-400">
{user.xp} XP
</span>

</div>

</div>

</motion.div>

</div>

</section>



{/* STATS */}

<section className="py-16">

<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">


{/* HOURS */}

<div className="bg-white/5 border border-white/10 p-6 text-center">

<Clock className="mx-auto mb-3 text-primary"/>

<p className="text-gray-400 text-sm">
Hours Played
</p>

<p className="text-3xl font-bold">
{user.hoursPlayed}
</p>

</div>


{/* BOOKINGS */}

<div className="bg-white/5 border border-white/10 p-6 text-center">

<Star className="mx-auto mb-3 text-primary"/>

<p className="text-gray-400 text-sm">
Total Bookings
</p>

<p className="text-3xl font-bold">
{user.totalBookings}
</p>

</div>


{/* XP */}

<div className="bg-white/5 border border-white/10 p-6 text-center">

<Trophy className="mx-auto mb-3 text-primary"/>

<p className="text-gray-400 text-sm">
Experience Points
</p>

<p className="text-3xl font-bold">
{user.xp}
</p>

</div>

</div>

</section>



{/* TOURNAMENT STATS */}

<section className="pb-20">

<div className="max-w-6xl mx-auto px-6">

<h2 className="text-3xl font-bold mb-8">

Tournament <span className="text-primary">Stats</span>

</h2>

<div className="grid md:grid-cols-3 gap-6">


{/* FIFA */}

<div className="bg-white/5 border border-white/10 p-6">

<h3 className="text-xl font-bold mb-4">
FIFA
</h3>

<p className="text-gray-400">
Played: {user.tournaments.fifa.played}
</p>

<p className="text-gray-400">
Wins: {user.tournaments.fifa.wins}
</p>

</div>


{/* MORTAL */}

<div className="bg-white/5 border border-white/10 p-6">

<h3 className="text-xl font-bold mb-4">
Mortal Kombat
</h3>

<p className="text-gray-400">
Played: {user.tournaments.mortal.played}
</p>

<p className="text-gray-400">
Wins: {user.tournaments.mortal.wins}
</p>

</div>


{/* COD */}

<div className="bg-white/5 border border-white/10 p-6">

<h3 className="text-xl font-bold mb-4">
Call Of Duty
</h3>

<p className="text-gray-400">
Played: {user.tournaments.cod.played}
</p>

<p className="text-gray-400">
Wins: {user.tournaments.cod.wins}
</p>

</div>


</div>

</div>

</section>

</div>

)

}