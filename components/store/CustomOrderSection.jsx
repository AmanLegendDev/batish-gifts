"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CustomOrderSection(){

return(

<section className="px-5 py-14 bg-gradient-to-b from-white to-gray-50 text-center">

  {/* TEXT */}
  <motion.div
    initial={{opacity:0, y:20}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}
    className="max-w-md mx-auto"
  >

    <p className="text-xs tracking-[3px] text-[var(--primary)] uppercase">
      Custom Orders
    </p>

    <h2 className="text-2xl font-semibold mt-2 text-gray-900">
      Didn’t Find What You’re Looking For?
    </h2>

    <p className="text-gray-500 mt-2 text-sm">
      Tell us your idea — we’ll arrange it specially for you 🎁
    </p>

  </motion.div>


  {/* BUTTONS */}
  <motion.div
    initial={{opacity:0, y:20}}
    whileInView={{opacity:1, y:0}}
    transition={{delay:0.2}}
    className="flex gap-3 justify-center mt-6 flex-wrap"
  >

    {/* FORM PAGE */}
    <Link
      href="/custom-order"
      className="bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-[1.04] transition"
    >
      Request Custom Item
    </Link>

   
  </motion.div>

</section>

);
}