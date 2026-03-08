import { Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function MovieNights() {

  const background =
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2000&q=80";

  return (

    <section className="relative bg-black w-full min-h-screen my-10 md:my-20 flex flex-col overflow-hidden text-white">

      {/* Background */}

      <div className="absolute inset-0 z-0">

        <motion.img
          src={background}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden md:block" />

      </div>

      {/* Content */}

      <div className="relative z-10 flex-grow flex items-center px-6 md:px-20 py-24 md:py-32">

        <div className="max-w-3xl">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >

            <span className="bg-emerald-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">
              Movie Nights
            </span>

            <h1 className="text-5xl md:text-7xl font-black mt-6 mb-6 leading-[0.9] uppercase drop-shadow-2xl">
              PRIVATE MOVIE ROOM
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Enjoy your favorite movies with friends in a private cinema room.
              We provide access to streaming platforms like
              <span className="text-emerald-400 font-bold"> Netflix</span>,
              <span className="text-emerald-400 font-bold"> Shahid</span> and
              <span className="text-emerald-400 font-bold"> Disney+</span>.
            </p>

            <p className="text-gray-400 mb-10">
              Choose your room, pick your time and enjoy the movie experience.
            </p>

            <Link
              to="/rooms?category=movie"
              state={{ type: "movie" }}
              className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 w-fit font-bold uppercase tracking-widest transition-all shadow-lg"
            >
              <Ticket size={20} />
              Book Movie Night
            </Link>

          </motion.div>

        </div>

      </div>

    </section>

  );

}