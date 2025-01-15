const CatatanKeaktifan = ({
    competitionCount,
    scholarshipCount,
    abdimasCount,
    researchCount,
}) => {
    return (
        <div className="py-6 px-8">
            <h2 className="text-2xl font-semibold mb-6">Catatan Keaktifan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-4 gap-6">
                {[
                    {
                        label: "LOMBA",
                        icon: "🏆",
                        count: competitionCount,
                        status1: "Menang",
                        status2: "Daftar",
                    },
                    {
                        label: "BEASISWA",
                        icon: "📝",
                        count: scholarshipCount,
                        status1: "Penerima",
                        status2: "Daftar",
                    },
                    {
                        label: "ABDIMAS",
                        icon: "👥",
                        count: abdimasCount,
                        status1: "Lolos",
                        status2: "Daftar",
                    },
                    {
                        label: "PENELITIAN",
                        icon: "🔍",
                        count: researchCount,
                        status1: "Lolos",
                        status2: "Daftar",
                    },
                ].map(({ label, icon, count, status1, status2 }) => (
                    <div
                        key={label}
                        className="bg-orange-100 border-2 border-neutral-200 rounded-lg p-6 flex items-center flex-col sm:flex-row"
                    >
                        <div className="text-5xl ml-2">{icon}</div>
                        <div className="ml-0 sm:ml-12 text-center">
                            <p className="font-semibold">{label}</p>
                            <p className="text-[#2d3036] text-2xl font-medium leading-10">
                                {count}
                            </p>
                            <p className="text-gray-600 text-xs">
                                {status1}/{status2}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CatatanKeaktifan;
