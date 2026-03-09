import { LogoutButton } from "@/components/logout-button";

const stats = [
  { label: "Students", value: "1,284", trend: "+18 this week" },
  { label: "Teachers", value: "86", trend: "2 on leave today" },
  { label: "Classes", value: "42", trend: "All rooms assigned" },
  { label: "Fee Collection", value: "$48,230", trend: "92% cleared" },
];

const schedule = [
  { time: "08:30", title: "Morning Assembly", location: "Main Ground" },
  { time: "09:20", title: "Class 10 Science Practical", location: "Lab 2" },
  { time: "11:00", title: "Teacher Coordination", location: "Conference A" },
  { time: "13:00", title: "Parent Query Window", location: "Office Desk" },
  { time: "15:10", title: "Transport Review", location: "Admin Wing" },
];

const notices = [
  "Final exams timetable will be published on Monday.",
  "Science fair registration closes tomorrow at 4:00 PM.",
  "Update student emergency contacts by end of week.",
  "Bus route 3 is delayed by 15 minutes due to maintenance.",
];

export default function AdminPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute top-0 left-[10%] h-56 w-56 rounded-full bg-[#6eb8ac]/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] bottom-[10%] h-56 w-56 rounded-full bg-[#f4c47f]/30 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="surface-enter rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(36,73,67,0.14)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-[#1f4c47] uppercase">
                Admin Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#193834] sm:text-4xl">
                Greenfield School Control Center
              </h1>
              <p className="mt-2 text-sm text-[#2d5d57] sm:text-base">
                Manage school operations from a single admin account.
              </p>
            </div>
            <LogoutButton />
          </div>
        </header>

        <section className="surface-enter-delay grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-[#1d3d39]/12 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-[#2d5d57]">{item.label}</p>
              <p className="mt-2 text-3xl font-extrabold text-[#193834]">{item.value}</p>
              <p className="mt-2 text-xs font-medium text-[#1f7f72]">{item.trend}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-3xl border border-[#1d3d39]/12 bg-white p-6 shadow-sm sm:p-7">
            <h2 className="text-xl font-extrabold text-[#193834]">Today&apos;s Schedule</h2>
            <p className="mt-1 text-sm text-[#2d5d57]">
              Key events that need admin monitoring.
            </p>

            <ul className="mt-5 space-y-3">
              {schedule.map((item) => (
                <li
                  key={`${item.time}-${item.title}`}
                  className="flex items-start gap-4 rounded-xl border border-[#ddeae7] bg-[#f8fcfb] p-4"
                >
                  <span className="min-w-[64px] rounded-lg bg-[#e6f2ef] px-2 py-1 text-center text-sm font-bold text-[#1f4c47]">
                    {item.time}
                  </span>
                  <div>
                    <p className="font-semibold text-[#193834]">{item.title}</p>
                    <p className="text-sm text-[#2d5d57]">{item.location}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-[#1d3d39]/12 bg-white p-6 shadow-sm sm:p-7">
            <h2 className="text-xl font-extrabold text-[#193834]">Notices</h2>
            <p className="mt-1 text-sm text-[#2d5d57]">Recent updates from management.</p>

            <ul className="mt-5 space-y-3">
              {notices.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-[#f0d7b1] bg-[#fff8ee] px-4 py-3 text-sm text-[#5f3f09]"
                >
                  {item}
                </li>
              ))}
            </ul>

            <button
              className="mt-6 w-full rounded-xl bg-[#1f7f72] px-4 py-3 text-sm font-bold tracking-wide text-white transition hover:bg-[#19695f]"
              type="button"
            >
              Create New Notice
            </button>
          </article>
        </section>
      </div>
    </main>
  );
}
