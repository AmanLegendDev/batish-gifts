  "use client";

  import { useState } from "react";
  import Image from "next/image";
  import Link from "next/link";
  import {
    Menu,
    X,
    LayoutDashboard,
    Package,
    ClipboardList,
    Tags
  } from "lucide-react";

  export default function AdminLayout({ children }) {

    const [open, setOpen] = useState(false);

    const closeSidebar = () => setOpen(false); // 🔥 MAIN FIX

    return (
      <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)]">

        {/* OVERLAY */}
        {open && (
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
          fixed md:static top-0 left-0 h-full w-64
          bg-white border-r border-[var(--border)]
          p-6 z-50 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        >

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">

            <div className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="logo"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <span className="font-semibold text-sm">
                Aarav Admin
              </span>
            </div>

            <button onClick={closeSidebar} className="md:hidden">
              <X size={20}/>
            </button>

          </div>

          {/* NAV */}
          <nav className="flex flex-col gap-2 text-sm">

            <Link href="/admin/dashboard" onClick={closeSidebar}>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--primary-soft)] transition">
                <LayoutDashboard size={18} />
                Dashboard
              </div>
            </Link>

            <Link href="/admin/products" onClick={closeSidebar}>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--primary-soft)] transition">
                <Package size={18} />
                Manage Products
              </div>
            </Link>

            <Link href="/admin/products/create" onClick={closeSidebar}>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--primary-soft)] transition">
                ➕ Add Product
              </div>
            </Link>

            <Link href="/admin/orders" onClick={closeSidebar}>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--primary-soft)] transition">
                <ClipboardList size={18} />
                Manage Orders
              </div>
            </Link>

            <Link href="/admin/categories" onClick={closeSidebar}>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--primary-soft)] transition">
                <Tags size={18} />
                Categories
              </div>
            </Link>

          </nav>

          {/* LOGOUT */}
          <div className="mt-10 border-t pt-4">

            <button
              onClick={() => {
                closeSidebar();
                window.location.href = "/";
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition"
            >
              🚪 Logout
            </button>

          </div>

        </aside>

        {/* MAIN */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* TOP BAR */}
          <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-[var(--border)] bg-white">

            <div className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="logo"
                width={34}
                height={34}
                className="rounded-lg"
              />
              <span className="font-semibold text-sm md:text-base">
                Aarav Gift Gallery
              </span>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>

          </header>

          {/* CONTENT */}
          <main className="p-4 md:p-6 bg-[#fafafa] min-h-screen overflow-x-hidden w-full max-w-full">
            {children}
          </main>

        </div>

      </div>
    );
  }