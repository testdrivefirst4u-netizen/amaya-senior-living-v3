"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="admin-sidebar">
      <Image
        src="/Amaya_black_Logo.webp"
        alt="Amaya"
        width={1080}
        height={543}
        className="admin-sidebar-logo-img"
      />
      <nav className="admin-sidebar-nav" aria-label="Admin">
        <Link href="/admin" className={pathname === "/admin" ? "is-active" : ""}>
          Dashboard
        </Link>
      </nav>
      <button className="admin-sidebar-logout" type="button" onClick={handleLogout}>
        Log Out
      </button>
    </aside>
  );
}
