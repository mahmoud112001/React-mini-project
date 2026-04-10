export default function Profile() {
  return (
    <div className="p-4 pb-24 max-w-md mx-auto">

      {/* Avatar */}
      <div className="flex flex-col items-center mt-8 mb-6">
        <div className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center mb-2">
          <i className="fa-solid fa-user text-2xl text-green-600"></i>
        </div>
        <h2 className="text-lg font-bold text-gray-800">Mahmoud Awad Saad</h2>
        <p className="text-gray-500 text-xs">Full-Stack MEARN Developer</p>
      </div>

      {/* Info rows */}
      <div className="bg-white border border-gray-200 rounded divide-y divide-gray-100">
        {[
          { icon: "fa-solid fa-code",           label: "Track",     value: "Full-Stack MEARN" },
          { icon: "fa-solid fa-school",          label: "Institute", value: "ITI — ICC Program" },
          { icon: "fa-solid fa-location-dot",    label: "City",      value: "Alexandria, Egypt" },
          { icon: "fa-solid fa-graduation-cap",  label: "Degree",    value: "Computer Engineering, AAST" },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <i className={`${row.icon} text-green-500 w-4 text-center text-sm`}></i>
            <span className="text-xs text-gray-500 flex-1">{row.label}</span>
            <span className="text-xs font-medium text-gray-700">{row.value}</span>
          </div>
        ))}
      </div>

      {/* Credit */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded p-3 text-center">
        <p className="text-xs text-green-700">
          Built during <strong>ITI React Course</strong>
        </p>
        <p className="text-xs text-green-600 mt-0.5">
          Under supervision of <strong>Eng. Islam Baidaq</strong>
        </p>
      </div>
    </div>
  );
}