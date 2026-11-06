
import { Search, Bell, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-8 text-white">

      <div>
        <h2 className="text-lg font-semibold">Overview</h2>
        <p className="text-sm text-slate-400">
          Welcome to your device dashboard.
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="hidden items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 md:flex">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search devices..."
            className="w-40 bg-transparent text-sm outline-none placeholder:text-slate-500"
          />
        </div>

        <button className="text-slate-400 hover:text-white">
          <Bell size={21} />
        </button>

        <div className="flex items-center gap-2">
          <UserCircle size={30} className="text-violet-400" />
          <span className="hidden text-sm md:block">My Account</span>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
