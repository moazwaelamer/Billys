import { Cake, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import img from "../../asst/birthday.png";

export function BirthdayService() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-black">

      {/* Background */}
      <div className="absolute inset-0">

        <motion.img
          src={img}
          alt="Birthday Party"
          loading="eager"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full h-full object-cover object-center brightness-[0.85] contrast-[1.1] saturate-[1.1]"
        />

        {/* overlay للموبايل */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 md:px-16 w-full">

        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >

          {/* Badge */}
          <span className="inline-block bg-red-600 text-white px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-6">
            Exclusive Offer
          </span>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1] mb-6 tracking-tight">
            BIRTHDAY
            <br />
            <span className="text-red-600">PARTIES</span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-xl text-white/90 mb-8 leading-relaxed max-w-md">
            Celebrate your birthday in complete privacy with your friends.
            Enjoy the latest games and movies in fully equipped rooms designed
            for unforgettable moments.
          </p>

          {/* Button */}
          <Link
            to="/rooms?category=birthday"
            state={{ type: "birthday" }}
            className="group flex items-center gap-3 bg-red-600 hover:bg-white hover:text-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 w-fit text-sm sm:text-base font-bold uppercase transition-all duration-300 rounded-sm"
          >
            <Cake size={18} className="group-hover:scale-110 transition-transform" />

            <span>Book Now</span>

            <ArrowRight
              size={16}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>

        </motion.div>

      </div>

    </section>
  );
}