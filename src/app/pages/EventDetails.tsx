import { useParams, useLocation } from "react-router-dom";
import { Calendar, Clock, Trophy, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
const events = [
{
id: 1,
game:"fifa",
title: "FIFA Tournament",
date: "March 5, 2026",
time: "6:00 PM",
prize: "2000 EGP",
players: "16 Players",
image:
"https://images.unsplash.com/photo-1614294149010-950b698f72c0?auto=format&fit=crop&w=1400&q=80",
},

{
id: 2,
game:"mortal",
title: "Mortal Kombat Championship",
date: "March 12, 2026",
time: "7:00 PM",
prize: "1500 EGP",
players: "8 Players",
image:
"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80",
},

{
id: 3,
game:"cod",
title: "Call Of Duty Squad Battle",
date: "March 19, 2026",
time: "8:00 PM",
prize: "3000 EGP",
players: "4 Teams",
image:
"https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&w=1400&q=80",
},
];

export function EventDetails() {

const { id } = useParams();
const location = useLocation();

const [joined,setJoined] = useState(false)

let event = location.state?.event;

if (!event) {
event = events.find((e) => e.id === Number(id));
}

if (!event) {
return <h1 className="text-white">Event not found</h1>;
}


/* REGISTER TOURNAMENT */

const handleRegister = () => {

const savedUser = localStorage.getItem("userProfile");

if(!savedUser){
toast.error("Please login first");
return;
}

const user = JSON.parse(savedUser);

user.tournaments[event.game].played += 1;

user.xp += 30;

localStorage.setItem("userProfile",JSON.stringify(user));

setJoined(true);

toast.success("Successfully joined tournament +30 XP");

}


/* FAKE PLAYERS FOR BRACKET */

const players = [
"Ahmed",
"Moaz",
"Omar",
"Kareem",
"Ali",
"Youssef",
"Mostafa",
"Mahmoud"
]


return (

<div className="pt-20 bg-zinc-950 text-white min-h-screen">


{/* HERO */}

<div className="relative h-[65vh] overflow-hidden">

<img
src={event.image}
loading="lazy"
alt={event.title}
className="w-full h-full object-cover"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"/>

<div className="absolute inset-0 flex items-center justify-center text-center">

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
>

<h1 className="text-5xl md:text-7xl font-black italic mb-6">
{event.title}
</h1>

<p className="text-gray-300 text-lg max-w-xl mx-auto">
Compete with the best players and win amazing prizes.
Show your skills and become the champion.
</p>

</motion.div>

</div>

</div>


{/* CONTENT */}

<div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14">


{/* LEFT SIDE */}

<div className="space-y-6">

<h2 className="text-3xl font-bold mb-6">
Tournament <span className="text-primary">Details</span>
</h2>

<div className="grid gap-4">


<div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-lg">

<Calendar className="text-primary"/>

<div>
<p className="text-gray-400 text-sm">Date</p>
<p className="font-bold">{event.date}</p>
</div>

</div>


<div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-lg">

<Clock className="text-primary"/>

<div>
<p className="text-gray-400 text-sm">Time</p>
<p className="font-bold">{event.time}</p>
</div>

</div>


<div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-lg">

<Users className="text-primary"/>

<div>
<p className="text-gray-400 text-sm">Players</p>
<p className="font-bold">{event.players}</p>
</div>

</div>


<div className="flex items-center gap-4 bg-primary/10 border border-primary/40 p-4 rounded-lg">

<Trophy className="text-primary"/>

<div>
<p className="text-gray-400 text-sm">Prize Pool</p>
<p className="text-2xl font-bold text-primary">
{event.prize}
</p>
</div>

</div>

</div>

</div>



{/* JOIN BOX */}

<motion.div
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
className="bg-white/5 border border-white/10 p-8 rounded-2xl h-fit"
>

<h2 className="text-3xl font-bold mb-6">
Join Tournament
</h2>

<p className="text-gray-400 mb-8 leading-relaxed">
Reserve your slot and challenge the best players in Billy's Hub.
Only a limited number of spots are available.
</p>

<button
onClick={handleRegister}
disabled={joined}
className="w-full flex items-center justify-center gap-3 py-4 bg-primary hover:bg-red-700 transition font-bold text-lg disabled:bg-gray-500"
>

{joined ? "Joined Tournament" : "Register Now"}

</button>

</motion.div>

</div>


{/* TOURNAMENT BRACKET */}

<div className="max-w-6xl mx-auto px-6 pb-20">

<h2 className="text-4xl font-bold mb-10">
Tournament <span className="text-primary">Bracket</span>
</h2>

<div className="grid md:grid-cols-2 gap-6">

{players.map((player,index)=>(

<div
key={index}
className="bg-white/5 border border-white/10 p-5 flex justify-between rounded-lg"
>

<span>{player}</span>

<span className="text-primary font-bold">
VS
</span>

<span>
Player {index+1}
</span>

</div>

))}

</div>

</div>


</div>

)

}