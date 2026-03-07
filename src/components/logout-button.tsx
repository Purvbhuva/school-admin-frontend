"use client";

import { useRouter } from "next/navigation";

import { AUTH_COOKIE_NAME } from "@/lib/admin-auth";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
    localStorage.removeItem("school_admin_username");
    router.replace("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-[#2d5d57] px-4 py-2 text-sm font-semibold text-[#1d3d39] transition hover:bg-[#e7f2ef]"
      type="button"
      aria-label="Logout admin"
    >
      Logout
    </button>
  );
}
