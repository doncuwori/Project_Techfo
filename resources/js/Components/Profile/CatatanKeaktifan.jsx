const CatatanKeaktifan = ({partisipasiLomba, prestasiLomba}) => {
    return (
        <div className="py-6 px-8">
            <h2 className="text-2xl font-semibold mb-6">Catatan Keaktifan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "LOMBA", icon: "🏆", count: `${partisipasiLomba.length}/${prestasiLomba.length}` },
                    { label: "BEASISWA", icon: "📝", count: "36/50" },
                    { label: "ABDIMAS", icon: "👥", count: "36/50" },
                    { label: "PENELITIAN", icon: "🔍", count: "36/50" },
                ].map((item) => (
                    <div
                        key={item.label}
                        className="bg-orange-100 border border-neutral-200 rounded-lg p-4 flex items-center"
                    >
                        <div className="text-5xl ml-6">{item.icon}</div>
                        <div className="ml-14">
                            <p className="font-semibold text-lg">
                                {item.label}
                            </p>
                            <p className="text-[#2d3036] text-2xl font-medium leading-10">
                                {item.count}
                            </p>
                            <p className="text-gray-600 text-xs mt-1">
                                Daftar/Menang
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CatatanKeaktifan;
