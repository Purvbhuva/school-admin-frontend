"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
  AUTH_COOKIE_AGE_SECONDS,
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_VALUE,
} from "@/lib/admin-auth";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const hasAccess = document.cookie
      .split("; ")
      .some((cookie) => cookie === `${AUTH_COOKIE_NAME}=${AUTH_COOKIE_VALUE}`);

    if (hasAccess) {
      router.replace("/admin");
    }
  }, [router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const isValidAdmin =
      username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;

    if (!isValidAdmin) {
      setError("Invalid credentials. Please use the configured admin account.");
      setIsSubmitting(false);
      return;
    }

    document.cookie = `${AUTH_COOKIE_NAME}=${AUTH_COOKIE_VALUE}; path=/; max-age=${AUTH_COOKIE_AGE_SECONDS}; SameSite=Lax`;
    localStorage.setItem("school_admin_username", ADMIN_USERNAME);

    const nextPath = searchParams.get("next");
    const safeNextPath =
      nextPath && nextPath.startsWith("/") ? nextPath : "/admin";

    router.replace(safeNextPath);
    router.refresh();
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute -top-28 -left-24 h-72 w-72 rounded-full bg-[#69c3b7]/45 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#f4c47f]/35 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_24px_70px_rgba(36,73,67,0.16)] backdrop-blur sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
        <section className="space-y-7">
          <p className="inline-flex rounded-full border border-[#1d3d39]/20 bg-[#e7f2ef] px-4 py-2 text-xs font-semibold tracking-[0.2em] text-[#1d3d39] uppercase">
            School System Frontend
          </p>

          <h1 className="max-w-2xl text-3xl leading-tight font-extrabold tracking-tight text-[#193834] sm:text-4xl lg:text-5xl">
            Single-admin control panel for daily school operations.
          </h1>

          <p className="max-w-xl text-base leading-7 text-[#2d5d57] sm:text-lg">
            This setup is frontend-only and built for one administrator account.
            Use the login form to access attendance, notices, schedule, and
            quick school metrics.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-[#1d3d39]/12 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-bold tracking-wide text-[#1f4c47] uppercase">
                Today at a glance
              </h2>
              <p className="mt-3 text-3xl font-extrabold text-[#193834]">94.2%</p>
              <p className="mt-1 text-sm text-[#2d5d57]">Overall attendance</p>
            </article>

            <article className="rounded-2xl border border-[#1d3d39]/12 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-bold tracking-wide text-[#1f4c47] uppercase">
                Pending approvals
              </h2>
              <p className="mt-3 text-3xl font-extrabold text-[#193834]">12</p>
              <p className="mt-1 text-sm text-[#2d5d57]">Admissions and leave</p>
            </article>
          </div>
        </section>

        <section className="rounded-3xl border border-[#1d3d39]/15 bg-[#f8fcfb] p-6 shadow-[0_16px_40px_rgba(36,73,67,0.12)] sm:p-8">
          <h2 className="text-2xl font-extrabold text-[#1a3a36]">Admin Login</h2>
          <p className="mt-2 text-sm text-[#2d5d57]">
            Sign in with the single admin account to enter the dashboard.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold text-[#1f4c47]" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              placeholder="Enter admin username"
              className="w-full rounded-xl border border-[#c8ddd8] bg-white px-4 py-3 text-[#193834] outline-none transition focus:border-[#1f7f72] focus:ring-2 focus:ring-[#1f7f72]/20"
              required
            />

            <label className="block text-sm font-semibold text-[#1f4c47]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              placeholder="Enter admin password"
              className="w-full rounded-xl border border-[#c8ddd8] bg-white px-4 py-3 text-[#193834] outline-none transition focus:border-[#1f7f72] focus:ring-2 focus:ring-[#1f7f72]/20"
              required
            />

            {error ? (
              <p className="rounded-lg border border-[#f2b9a4] bg-[#fff4ef] px-3 py-2 text-sm text-[#8f3011]">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl bg-[#1f7f72] px-4 py-3 text-sm font-bold tracking-wide text-white transition hover:bg-[#19695f] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Checking..." : "Login as Admin"}
            </button>
          </form>

          <div className="mt-5 rounded-xl border border-dashed border-[#9dc7c0] bg-white px-4 py-3 text-xs leading-5 text-[#1f4c47]">
            <p className="font-semibold">Demo admin credentials</p>
            <p>
              Username: <strong>{ADMIN_USERNAME}</strong>
            </p>
            <p>
              Password: <strong>{ADMIN_PASSWORD}</strong>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
