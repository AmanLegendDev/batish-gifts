import Link from "next/link";
import Image from "next/image";

export default function Footer() {

  return (

    <footer className="relative overflow-hidden bg-gradient-to-b from-[#fffaf8] to-white border-t border-white/60 mt-0">

      {/* SOFT GLOW */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[var(--primary)]/5 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 py-12">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>

            <div className="flex items-center gap-3">

              <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white shadow-md border border-white">

                <Image
                  src="/logo.jpg"
                  alt="Aarav Gift Gallery"
                  fill
                  className="object-cover"
                />

              </div>

              <div>

                <h2 className="text-lg font-bold text-gray-900">
                  Aarav Gift Gallery
                </h2>

                <p className="text-xs text-[var(--primary)]">
                  Shimla's Gift Store ✨
                </p>

              </div>

            </div>


            <p className="text-gray-500 mt-4 text-sm leading-relaxed max-w-xs">

              Beautiful gifts, cute surprises &
              thoughtful collections for every
              special moment 💝

            </p>

          </div>


          {/* LINKS */}
          <div>

            <h3 className="font-semibold text-gray-900 mb-4">
              Explore
            </h3>

            <div className="flex flex-col gap-3 text-sm text-gray-500">

              <Link
                href="/"
                className="hover:text-[var(--primary)] transition"
              >
                Home
              </Link>

              <Link
                href="/category/all"
                className="hover:text-[var(--primary)] transition"
              >
                Shop Gifts
              </Link>

              <Link
                href="/custom-order"
                className="hover:text-[var(--primary)] transition"
              >
                Custom Orders
              </Link>

            </div>

          </div>


          {/* STORE */}
          <div>

            <h3 className="font-semibold text-gray-900 mb-4">
              Why Customers Love Us
            </h3>

            <div className="flex flex-col gap-3 text-sm text-gray-500">

              <p>🎁 Unique gift collections</p>

              <p>💝 Personalized gifting options</p>

              <p>⚡ Quick WhatsApp response</p>

              <p>📦 Smooth ordering experience</p>

            </div>

          </div>


          {/* CONTACT */}
          <div>

            <h3 className="font-semibold text-gray-900 mb-4">
              Contact
            </h3>

            <div className="flex flex-col gap-3 text-sm text-gray-500">

              <p>
                📍 Panthaghati, Shimla
              </p>

              <a
                href="tel:9459365278"
                className="hover:text-[var(--primary)] transition"
              >
                📞 +91 94593 65278
              </a>

              <a
                href="https://wa.me/919459365278"
                target="_blank"
                className="hover:text-[var(--primary)] transition"
              >
                💬 WhatsApp Support
              </a>

            </div>

          </div>

        </div>


        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />


        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">

          <p>
            © {new Date().getFullYear()} Aarav Gift Gallery.
            All rights reserved.
          </p>

          <p>

            Built with 💝 by

            <span className="text-[var(--primary)] font-medium ml-1">
              Aman Digital Solution
            </span>

          </p>

        </div>

      </div>

    </footer>

  );

}