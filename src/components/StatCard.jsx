
function StatCard({ title, value, description, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={23} />
        </div>

      </div>

      <p className="mt-4 text-xs text-slate-500">
        {description}
      </p>

    </div>
  );
}

export default StatCard;
