import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
function getRank(xp:number){

if(xp >= 5000) return "Legend"

if(xp >= 3000) return "Diamond"

if(xp >= 1500) return "Gold"

if(xp >= 700) return "Silver"

return "Bronze"

}
export function Booking() {

const { roomId } = useParams();
const navigate = useNavigate();
const location = useLocation();

/* STEP SYSTEM */

const [step,setStep] = useState(1);
const [bookingComplete,setBookingComplete] = useState(false);

/* CARD TYPE */

const [cardType,setCardType] = useState("");

const {
roomName,
date,
time,
mode,
price,
duration: selectedDuration
} = location.state || {};

/* CONTACT DATA */

const [formData,setFormData] = useState({
name:"",
email:"",
phone:"",
date: date || "",
time: time || "",
duration: selectedDuration || ""
});

/* PAYMENT DATA */

const [payment,setPayment] = useState({
cardName:"",
cardNumber:"",
expiry:"",
cvv:""
});

/* INPUT CHANGE */

const handleInputChange = (e:any)=>{

setFormData({
...formData,
[e.target.name]: e.target.value
});

};

/* PAYMENT CHANGE */

const handlePaymentChange = (e:any)=>{

const {name,value} = e.target

if(name === "cardNumber"){

const number = value.replace(/\D/g,"")

let type = ""

if(number.startsWith("4")) type = "visa"

else if(/^5[1-5]/.test(number)) type = "mastercard"

else if(number.startsWith("5078") || number.startsWith("5067"))
type = "meeza"

setCardType(type)

setPayment({
...payment,
cardNumber:number
})

return
}

setPayment({
...payment,
[name]:value
})

};

/* TIME PARSER */

const parseTime = (time:string)=>{

const [hourMin, modifier] = time.split(" ");
let [hour, minute] = hourMin.split(":").map(Number);

if (modifier === "PM" && hour !== 12) hour += 12;
if (modifier === "AM" && hour === 12) hour = 0;

return hour + minute / 60;

};

const basePrice = price || 0;
const duration = parseFloat(formData.duration || "0");
const finalTotal = basePrice * duration;

/* SUBMIT */

const handleSubmit = (e:any)=>{

e.preventDefault();

if(step < 3){
setStep(step+1);
return;
}

if(!payment.cardName || !payment.cardNumber || !payment.expiry || !payment.cvv){
toast.error("Please complete payment details");
return;
}

/* LOGIN CHECK */

const savedUser = localStorage.getItem("userProfile");

if(!savedUser){

toast.error("Please login first");
navigate("/login");
return;

}

const user = JSON.parse(savedUser);

/* TIME CHECK */

const start = parseTime(formData.time);
const end = start + duration;

const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

/* OVERLAP CHECK */

const conflict = allBookings.some((b:any)=>

b.roomId === Number(roomId) &&
b.date === formData.date &&
(
start < b.end && end > b.start
)

);

if(conflict){

toast.error("This time slot is already booked");
return;

}

/* CREATE BOOKING */

const newBooking = {

roomId:Number(roomId),
roomName,
date:formData.date,

start,
end,

time: formData.time,

duration,
price:finalTotal,
userEmail:user.email

};

/* SAVE BOOKING */

localStorage.setItem(
"bookings",
JSON.stringify([...allBookings,newBooking])
);

/* UPDATE USER */

user.totalBookings = (user.totalBookings || 0) + 1;

user.hoursPlayed = (user.hoursPlayed || 0) + duration;

const earnedXP = duration * 20;

user.xp = (user.xp || 0) + earnedXP;

/* UPDATE RANK */

user.rank = getRank(user.xp);

localStorage.setItem("userProfile",JSON.stringify(user));


/* UPDATE ACCOUNT */

const accounts = JSON.parse(localStorage.getItem("userAccount") || "[]");

const index = accounts.findIndex((acc:any)=>acc.email === user.email);

if(index !== -1){

accounts[index] = user;
localStorage.setItem("userAccount",JSON.stringify(accounts));

}

window.dispatchEvent(new Event("storage"));

toast.success(`Booking completed +${earnedXP} XP 🎮`);

setBookingComplete(true);

};

/* SUCCESS PAGE */

if(bookingComplete){

return(


<div className="pt-20 min-h-screen flex items-center justify-center bg-zinc-950">

<motion.div
initial={{opacity:0,scale:0.9}}
animate={{opacity:1,scale:1}}
className="max-w-2xl w-full mx-4"
>

<div className="bg-white/5 border border-white/10 p-12 text-center">

<div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
<CheckCircle className="w-16 h-16 text-primary"/>
</div>

<h1 className="text-4xl font-bold mb-4 text-white">
Booking Confirmed!
</h1>

<p className="text-gray-400 mb-6">
Your booking has been saved successfully.
</p>

<button
onClick={()=>navigate("/profile")}
className="px-6 py-3 bg-primary text-white hover:bg-red-700"
>
Go To Profile
</button>

</div>

</motion.div>

</div>

);

}

/* UI */

return(

<div className="pt-20 min-h-screen bg-zinc-950">

<div className="max-w-7xl mx-auto px-4 py-12">

<div className="grid lg:grid-cols-3 gap-12">

<div className="lg:col-span-2">

<form onSubmit={handleSubmit} className="space-y-8">

<AnimatePresence mode="wait">

{step === 1 && (

<motion.div
initial={{opacity:0,x:20}}
animate={{opacity:1,x:0}}
exit={{opacity:0,x:-20}}
className="bg-white/5 border border-white/10 p-8"
>

<h2 className="text-3xl font-bold mb-6 text-white">
Contact Information
</h2>

<input
name="name"
required
placeholder="Full Name"
value={formData.name}
onChange={handleInputChange}
className="w-full mb-4 bg-white/5 border border-white/10 px-4 py-3 text-white"
/>

<input
type="email"
required
name="email"
placeholder="Email"
value={formData.email}
onChange={handleInputChange}
className="w-full mb-4 bg-white/5 border border-white/10 px-4 py-3 text-white"
/>

<input
required
name="phone"
placeholder="Phone"
value={formData.phone}
onChange={handleInputChange}
className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white"
/>

</motion.div>

)}

{step === 2 && (

<motion.div
initial={{opacity:0,x:20}}
animate={{opacity:1,x:0}}
exit={{opacity:0,x:-20}}
className="bg-white/5 border border-white/10 p-8"
>

<h2 className="text-3xl font-bold mb-6 text-white">
Booking Details
</h2>

<div className="mb-4 text-white">
Date: {formData.date}
</div>

<div className="mb-4 text-white">
Time: {formData.time}
</div>

<div className="mb-4 text-white">
Duration: {formData.duration} Hours
</div>

</motion.div>

)}

{step === 3 && (

<motion.div
initial={{opacity:0,x:20}}
animate={{opacity:1,x:0}}
exit={{opacity:0,x:-20}}
className="bg-white/5 border border-white/10 p-8 space-y-4"
>

<h2 className="text-3xl font-bold text-white">
Secure Payment
</h2>

<input
name="cardName"
required
placeholder="Cardholder Name"
value={payment.cardName}
onChange={handlePaymentChange}
className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white"
/>

<div className="relative">

<input
name="cardNumber"
required
inputMode="numeric"
pattern="[0-9]{16}"
maxLength={16}
placeholder="Card Number"
value={payment.cardNumber}
onChange={handlePaymentChange}
className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white pr-24"
/>

<div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">

<img src="/cards/visa.png"  loading="lazy"
className={`h-6 ${cardType==="visa" ? "opacity-100":"opacity-30"}`}/>

<img src="/cards/mastercard.png"  loading="lazy"
className={`h-6 ${cardType==="mastercard" ? "opacity-100":"opacity-30"}`}/>

<img src="/cards/meeza.png"loading="lazy"
className={`h-6 ${cardType==="meeza" ? "opacity-100":"opacity-30"}`}/>

</div>

</div>

<div className="grid grid-cols-2 gap-4">

<input
name="expiry"
required
maxLength={5}
placeholder="MM/YY"
value={payment.expiry}
onChange={(e)=>{

let value = e.target.value.replace(/\D/g,"")

if(value.length >= 3){
value = value.slice(0,2)+"/"+value.slice(2,4)
}

setPayment({...payment,expiry:value})

}}
className="bg-white/5 border border-white/10 px-4 py-3 text-white"
/>

<input
name="cvv"
required
maxLength={4}
placeholder="CVV"
value={payment.cvv}
onChange={handlePaymentChange}
className="bg-white/5 border border-white/10 px-4 py-3 text-white"
/>

</div>

</motion.div>

)}

</AnimatePresence>

<button
type="submit"
className="w-full py-4 bg-primary text-white flex items-center justify-center"
>

{step === 3 ? "Complete Booking" : "Continue"}

<ChevronRight className="ml-2"/>

</button>

</form>

</div>

<div className="bg-white/5 border border-white/10 p-6 h-fit">

<h3 className="text-2xl font-bold mb-6 text-white">
Booking Summary
</h3>

<p className="text-gray-400">Room</p>
<p className="mb-2">{roomName}</p>

<p className="text-gray-400">Mode</p>
<p className="mb-2 capitalize">{mode}</p>

<p className="text-gray-400">Price / Hour</p>
<p className="mb-4 text-primary">{basePrice} EGP</p>

<p className="text-gray-400">Total</p>
<p className="text-2xl font-bold text-primary">
{finalTotal.toFixed(0)} EGP
</p>

</div>

</div>

</div>

</div>

);
}