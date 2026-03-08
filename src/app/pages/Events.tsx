import { useState } from "react"; // ضفنا الـ State
import { motion } from "framer-motion";
import { Calendar, Trophy, Users, ChevronRight, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router-dom";

export function Events() {
  const [hoveredId, setHoveredId] = useState<number | null>(null); // State للهوفر

  const upcomingEvents = [
    {
      id: 1,
      game: "fifa",
      title: "FIFA Tournament",
      date: "March 5, 2026",
      time: "6:00 PM",
      prize: "2000 EGP",
      players: "16 Players",
      image: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?auto=format&fit=crop&w=1080&q=80",
      status: "Open",
    },
    {
      id: 2,
      game: "mortal",
      title: "Mortal Kombat Championship",
      date: "March 12, 2026",
      time: "7:00 PM",
      prize: "1500 EGP",
      players: "8 Players",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1080&q=80",
      status: "Open",
    },
    {
      id: 3,
      game: "cod",
      title: "Call Of Duty Squad Battle",
      date: "March 19, 2026",
      time: "8:00 PM",
      prize: "3000 EGP",
      players: "4 Teams",
      image: "https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&w=1080&q=80",
      status: "Almost Full",
    },
  ];

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Header Section */}
      <section className="relative py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase"
          >
            UPCO<span className="text-primary">MING</span> EVENTS
          </motion.h1>
          <p className="mt-4 text-[10px] tracking-[0.5em] uppercase text-zinc-500 font-bold">
            Exclusive tournaments
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            onMouseLeave={() => setHoveredId(null)}
          >
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                onMouseEnter={() => setHoveredId(event.id)}
                animate={{
                  // الأنيميشن السحري: اختفاء تام للباقي
                  opacity: hoveredId === null || hoveredId === event.id ? 1 : 0,
                  scale: hoveredId === event.id ? 1.05 : 0.95,
                  filter: hoveredId !== null && hoveredId !== event.id 
                    ? "blur(20px) brightness(0)" 
                    : "none",
                  zIndex: hoveredId === event.id ? 20 : 1
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative bg-zinc-950 border border-white/5 overflow-hidden cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase italic tracking-widest ${
                      event.status === "Open" ? "bg-green-600" : "bg-primary"
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 space-y-6 bg-zinc-950">
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        <Calendar className="w-3 h-3 text-primary" /> Date
                      </div>
                      <p className="text-sm font-black italic">{event.date}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        <Clock className="w-3 h-3 text-primary" /> Time
                      </div>
                      <p className="text-sm font-black italic">{event.time}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        <Trophy className="w-3 h-3 text-primary" /> Prize
                      </div>
                      <p className="text-2xl font-black italic text-primary">{event.prize}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        <Users className="w-3 h-3 text-primary" /> Slots
                      </div>
                      <p className="text-sm font-black italic uppercase">{event.players}</p>
                    </div>
                  </div>

                  <Link
                    to={`/event/${event.id}`}
                    state={{ event }}
                    className="w-full mt-4 px-6 py-4 bg-primary text-white font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center group/btn"
                  >
                    Register Now
                    <ChevronRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                  </Link>
                </div>

                {/* Neon Underline */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-1.5 bg-primary shadow-[0_0_20px_#ff0000]"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredId === event.id ? "100%" : 0 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}