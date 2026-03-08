import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, ChevronRight, Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { roomsData } from "../../data/roomsData";
import { useEffect, useState } from "react"; // ضفنا useState

export function Rooms() {
  const [hoveredId, setHoveredId] = useState<string | number | null>(null); // State للهوفر

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const filteredRooms =
    category === "standard" ||
    category === "mini" ||
    category === "vip"
      ? roomsData.filter(room => room.category === category)
      : roomsData;

  const getTitle = () => {
    if (category === "standard") return "Standard Rooms";
    if (category === "mini") return "Mini Rooms";
    if (category === "vip") return "VIP Rooms";
    if (category === "movie") return "Movie Night Rooms";
    if (category === "birthday") return "Birthday Rooms";
    return "All Gaming Rooms";
  };

  return (
    <div className="pt-20 bg-black min-h-screen text-white"> {/* التأكد من bg-black */}
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter"
        >
          {getTitle()}
        </motion.h2>

        {category && (
          <Link
            to="/rooms"
            className="text-primary text-sm hover:underline mt-2 inline-block font-bold uppercase tracking-widest"
          >
            ← Show All Rooms
          </Link>
        )}
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            onMouseLeave={() => setHoveredId(null)} // إلغاء الهوفر عند الخروج
          >
            {filteredRooms?.map((room) => (
              <motion.div
                key={room.id}
                onMouseEnter={() => setHoveredId(room.id)} // تفعيل الهوفر
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  // تأثير العتمة بالململي
                  opacity: hoveredId === null || hoveredId === room.id ? 1 : 0,
                  scale: hoveredId === room.id ? 1.03 : 0.98,
                  filter: hoveredId !== null && hoveredId !== room.id 
                    ? "blur(20px) brightness(0)" 
                    : "blur(0px) brightness(1)",
                  zIndex: hoveredId === room.id ? 20 : 1
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative bg-zinc-950 border border-white/5 overflow-hidden cursor-pointer"
              >
                <Link
                  to={`/rooms/${room.id}`}
                  state={{ type: category || "gaming" }}
                  className="block"
                >
                  <div className="relative h-72 overflow-hidden">
                    <ImageWithFallback
                      src={room.image}
                      alt={room.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/80 px-3 py-1.5 backdrop-blur-md border border-white/10 z-20">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-bold">{room.rating}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors text-white">
                        {room.name}
                      </h3>
                      <div className="flex items-center gap-2 bg-primary/10 px-2 py-1">
                        <Users size={14} className="text-primary" />
                        <span className="text-xs font-bold text-white uppercase">{room.capacity}</span>
                      </div>
                    </div>

                    {category !== "movie" && category !== "birthday" && (
                      <div className="flex gap-2 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-white/10 text-zinc-500">Single</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-white/10 text-zinc-500">Multi</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-5 border-t border-white/10">
                      <div className="space-y-1">
                        {category !== "movie" && category !== "birthday" && (
                          <>
                            <p className="text-sm font-bold text-zinc-400 uppercase tracking-tighter">
                              Single: <span className="text-xl text-white italic ml-1">{room.prices?.gaming?.single} EGP</span>
                            </p>
                            <p className="text-sm font-bold text-zinc-400 uppercase tracking-tighter">
                              Multi: <span className="text-xl text-white italic ml-1">{room.prices?.gaming?.multi} EGP</span>
                            </p>
                          </>
                        )}

                        {category === "movie" && (
                          <p className="text-sm font-bold text-zinc-400 uppercase tracking-tighter">
                            Price: <span className="text-2xl text-white italic ml-1">{room.prices?.movie} EGP</span>
                          </p>
                        )}

                        {category === "birthday" && (
                          <p className="text-sm font-bold text-zinc-400 uppercase tracking-tighter">
                            Price: <span className="text-2xl text-white italic ml-1">{room.prices?.birthday} EGP</span>
                          </p>
                        )}
                      </div>

                      <div className="h-12 w-12 border border-primary/30 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                        <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* خط النيون السفلي السحري */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-primary shadow-[0_0_15px_#ff0000]"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredId === room.id ? "100%" : 0 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}