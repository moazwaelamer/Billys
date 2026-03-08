import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Star, Check, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import toast from "react-hot-toast";
import { roomsData } from "../../data/roomsData";


export function RoomDetails() {
const navigate = useNavigate();
useEffect(()=>{
window.scrollTo(0,0)
},[])

const { id } = useParams();
const location = useLocation();

const room = roomsData.find(r => r.id === Number(id));

const bookingType = location.state?.type || "gaming";

if(!room){
return(
<div className="text-white p-20 text-center">
Room not found
</div>
)
}

/* ---------- STATES ---------- */

const [selectedDate,setSelectedDate] = useState(
new Date().toISOString().split("T")[0]
)

const [startTime,setStartTime] = useState("")
const [duration,setDuration] = useState(1)

const [gameMode,setGameMode] =
useState<"single"|"multi">("single")

/* ---------- DURATIONS ---------- */

const durations = [
{value:1,label:"1 Hour"},
{value:1.5,label:"1.5 Hours"},
{value:2,label:"2 Hours"},
{value:2.5,label:"2.5 Hours"},
{value:3,label:"3 Hours"}
]

/* ---------- TIME HELPERS ---------- */

const parseTime = (time?:string)=>{

if(!time) return 0

const [hourMin,modifier] = time.split(" ")

let [hour,minute] = hourMin.split(":").map(Number)

if(modifier === "PM" && hour !== 12) hour += 12
if(modifier === "AM" && hour === 12) hour = 0

return hour + minute/60

}

const formatTime = (time:number)=>{

let hour = Math.floor(time)
let minute = (time % 1) * 60

let modifier = hour >= 12 ? "PM" : "AM"

hour = hour % 12
if(hour === 0) hour = 12

return `${hour}:${minute === 0 ? "00" : minute} ${modifier}`

}

/* ---------- OPEN HOURS ---------- */

const OPEN = 12
const CLOSE = 26

/* ---------- GET BOOKINGS ---------- */

const allBookings =
JSON.parse(localStorage.getItem("bookings") || "[]")

const roomBookings = allBookings.filter((b:any)=>
b.roomId === Number(id) &&
b.date === selectedDate
)

/* ---------- GENERATE TIME SLOTS ---------- */

const generateSlots = ()=>{

const slots:string[] = []

for(let t = OPEN; t < CLOSE; t += 0.5){

const conflict = roomBookings.some((b:any)=>{

return t >= b.start && t < b.end

})

if(!conflict){

slots.push(formatTime(t))

}

}

return slots

}

const timeSlots = generateSlots()

/* ---------- END TIME ---------- */

const endTime =
startTime
? formatTime(parseTime(startTime) + duration)
: ""

/* ---------- PRICE ---------- */

let price = 0

if(bookingType === "gaming"){

price =
gameMode === "single"
? room.prices.gaming.single
: room.prices.gaming.multi

}

if(bookingType === "movie"){
price = room.prices.movie
}

if(bookingType === "birthday"){
price = room.prices.birthday
}

/* ---------- UI ---------- */

return(

<div className="pt-20 bg-zinc-950 min-h-screen text-white">

{/* HERO */}

<section className="relative h-[60vh] overflow-hidden">

<ImageWithFallback
src={room.image}
alt={room.name}
className="absolute inset-0 w-full h-full object-cover"
/>

<div className="absolute inset-0 bg-black/60"/>

<div className="absolute bottom-10 left-10 right-10">

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="bg-black/80 backdrop-blur-md p-6 border border-white/10"
>

<div className="flex items-center gap-4 mb-4">

<div className="flex items-center gap-2 bg-primary/20 px-3 py-1 border border-primary/50">
<Users className="w-4 h-4 text-primary"/>
<span>{room.capacity} Players</span>
</div>

<div className="flex items-center gap-1">
<Star className="w-5 h-5 text-yellow-400 fill-yellow-400"/>
<span className="font-bold">{room.rating}</span>
</div>

</div>

<h1 className="text-4xl font-bold">
{room.name}
</h1>

</motion.div>

</div>

</section>

{/* CONTENT */}

<section className="py-20">

<div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">

{/* FEATURES */}

<div className="lg:col-span-2 space-y-12">

<h2 className="text-3xl font-bold mb-6">
Room Features
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10">
<Check className="w-5 h-5 text-primary"/> PS5 Console
</div>

<div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10">
<Check className="w-5 h-5 text-primary"/> 4K Screen
</div>

<div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10">
<Check className="w-5 h-5 text-primary"/> RGB Lighting
</div>

<div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10">
<Check className="w-5 h-5 text-primary"/> High-Speed WiFi
</div>

</div>

</div>

{/* BOOKING BOX */}

<div className="lg:col-span-1">

<div className="sticky top-28 bg-white/5 border border-white/10 p-6">

{/* MODE */}

{bookingType === "gaming" &&(

<div className="mb-6">

<p className="text-gray-400 text-sm mb-3">
Select Mode
</p>

<div className="flex gap-2">

<button
onClick={()=>setGameMode("single")}
className={`flex-1 py-2 border ${
gameMode==="single"
? "bg-primary border-primary"
: "border-white/20"
}`}
>
Single
</button>

<button
onClick={()=>setGameMode("multi")}
className={`flex-1 py-2 border ${
gameMode==="multi"
? "bg-primary border-primary"
: "border-white/20"
}`}
>
Multi
</button>

</div>

</div>

)}

<p className="text-gray-400 text-sm">
Price per Hour
</p>

<p className="text-xl font-bold mb-6">
{price} EGP
</p>

<label className="block mb-2 flex items-center">
<Calendar className="w-4 h-4 mr-2 text-primary"/>
Select Date
</label>

<input
type="date"
value={selectedDate}
onChange={(e)=>setSelectedDate(e.target.value)}
className="w-full mb-6 bg-white/5 border border-white/10 px-4 py-3"
/>

<label className="block mb-3 flex items-center">
<Clock className="w-4 h-4 mr-2 text-primary"/>
Start Time
</label>

<div className="grid grid-cols-2 gap-2 mb-6">

{timeSlots.map((time,i)=>(

<button
key={i}
onClick={()=>setStartTime(time)}
className={`py-3 border ${
startTime===time
? "bg-primary border-primary"
: "bg-white/5 border-white/10"
}`}
>
{time}
</button>

))}

</div>

<label className="block mb-3">
Select Duration
</label>

<div className="grid grid-cols-3 gap-2 mb-6">

{durations.map((d,i)=>(

<button
key={i}
onClick={()=>setDuration(d.value)}
className={`py-3 border ${
duration===d.value
? "bg-primary border-primary"
: "bg-white/5 border-white/10"
}`}
>
{d.label}
</button>

))}

</div>

{startTime &&(

<p className="text-primary font-bold mb-4">
End Time: {endTime}
</p>

)}

{startTime &&(

<button
onClick={()=>{

const user = localStorage.getItem("userProfile")

if(!user){

toast.error("Please login first")

navigate("/login",{
state:{
redirectTo:`/booking/${room.id}`,
bookingData:{
roomId:room.id,
roomName:room.name,
date:selectedDate,
time:startTime,
duration:duration,
mode:gameMode,
price:price
}
}
})

return
}

navigate(`/booking/${room.id}`,{
state:{
roomId:room.id,
roomName:room.name,
date:selectedDate,
time:startTime,
duration:duration,
mode:gameMode,
price:price
}
})

}}
className="block w-full text-center py-4 font-bold bg-primary hover:bg-red-700 text-white mt-4"
>
Proceed to Booking
</button>

)}

</div>

</div>

</div>

</section>

</div>

)

}