import React, { useState } from "react";
import { Search } from "lucide-react";
import { getFiveYears } from "@/lib/helper";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
} from "chart.js";
import "react-circular-progressbar/dist/styles.css";
import NavbarAdmin from "@/Components/NavbarAdmin";
import CardStatis from "@/Components/Laporan/Lomba/CardStatis";
import TabelTabPartisipasi from "@/Components/Laporan/Lomba/TabelTabPartisipasi";
import TabelTabPrestasi from "@/Components/Laporan/Lomba/TabelTabPrestasi";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title
);

const LaporanLomba = ({
    competitionAchievementsCount,
    competitionRegistrantsCount,
    user,
    registrant,
    rekapJuara,
    totalMahasiswa,
    dataPendaftar,
    dataPemenang,
    prodi,
    angkatan,
    tingkat,
    predikat,
    bidang,
    jenis,
}) => {
    const [tabValue, settabValue] = useState("Pemenang");
    const [exportPendaftar, setExportPendaftar] = useState(false);
    const [exportPemenang, setExportPemenang] = useState(false);

    const [pemenangCount, setPemenangCount] = useState(
        dataPemenang.filter(
            (item) => item.competition_achievement.is_validated === true
        ).length
    );
    const [pesertaCount, setPesertaCount] = useState(dataPendaftar.length);

    const [filters, setFilters] = useState({
        predikat: "",
        tingkat: "",
        bidang: "",
        jenis: "",
        prodi: "",
        angkatan: "",
        nama: "",
        tahun: "",
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));

        if (name === "tahun") {
            setPemenangCount(
                dataPemenang.filter(
                    (item) =>
                        item.competition_achievement.is_validated === true &&
                        item.created_at.includes(value)
                ).length
            );
            setPesertaCount(
                dataPendaftar.filter((item) => item.created_at.includes(value))
                    .length
            );
        }
    };

    const handleExport = (val) => {
        if (val === "Pemenang") {
            setExportPemenang(true);
            setTimeout(() => {
                setExportPemenang(false);
            }, 100);
        } else {
            setExportPendaftar(true);
            setTimeout(() => {
                setExportPendaftar(false);
            }, 100);
        }
    };

    return (
        <body>
            <NavbarAdmin user={user} />
            <div class="pl-72 w-full">
                <div class="container px-4 py-8 w-full">
                    <h1 class="text-3xl font-bold text-black mt-16 mb-6">
                        Laporan Lomba
                    </h1>
                    <CardStatis
                        competitionAchievementsCount={pemenangCount}
                        competitionRegistrantsCount={pesertaCount}
                        totalMahasiswa={totalMahasiswa}
                    />

                    <div class="bg-white p-4 rounded-lg shadow-lg mt-6 mb-6 border-2 border-neutral-100">
                        <div class="flex items-center mb-4">
                            <button
                                onClick={() => {
                                    settabValue("Pemenang");
                                }}
                                className={`${
                                    tabValue === "Pemenang"
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 text-gray-700"
                                } py-1.5 px-2 w-[140px] rounded-l-md duration-300`}
                            >
                                Pemenang
                            </button>
                            <button
                                onClick={() => {
                                    settabValue("Pendaftar");
                                }}
                                className={`${
                                    tabValue === "Pendaftar"
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 text-gray-700"
                                } py-1.5 px-2 w-[140px] rounded-r-md duration-300`}
                            >
                                Partisipan
                            </button>
                        </div>
                        <div className="flex justify-between items-center relative w-full flex-wrap">
                            <div className="relative w-150 mb-2">
                                <input
                                    name="nama"
                                    onChange={(e) => handleFilterChange(e)}
                                    type="text"
                                    placeholder="Search"
                                    className="pl-10 py-2 rounded-lg border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                            </div>

                            <div className="flex flex-wrap gap-1.5 mb-2">
                                {/* Filter Predikat */}
                                {tabValue === "Pemenang" && (
                                    <select
                                        name="predikat"
                                        onChange={(e) => handleFilterChange(e)}
                                        className="py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">Semua Predikat Kemenangan</option>
                                        {predikat.map((item, index) => (
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                {/* Filter Tingkat */}
                                <select
                                    name="tingkat"
                                    onChange={(e) => handleFilterChange(e)}
                                    className="py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">
                                        Semua Tingkat Prestasi
                                    </option>
                                    {tingkat.map((item, index) => (
                                        <option value={item} key={index}>
                                            {item}
                                        </option>
                                    ))}
                                </select>

                                {/* Filter Bidang */}
                                <select
                                    name="bidang"
                                    onChange={(e) => handleFilterChange(e)}
                                    className="py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua Bidang Lomba</option>
                                    {bidang.map((item, index) => (
                                        <option value={item} key={index}>
                                            {item}
                                        </option>
                                    ))}
                                </select>

                                {/* Filter Jenis */}
                                <select
                                    name="jenis"
                                    onChange={(e) => handleFilterChange(e)}
                                    className="py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua Jenis Lomba</option>
                                    {jenis.map((item, index) => (
                                        <option value={item} key={index}>
                                            {item}
                                        </option>
                                    ))}
                                </select>

                                {/* Filter Prodi */}
                                <select
                                    name="prodi"
                                    onChange={(e) => handleFilterChange(e)}
                                    className="py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua Prodi</option>
                                    {prodi.map((item, index) => (
                                        <option
                                            value={item.nama_prodi}
                                            key={index}
                                        >
                                            {item.nama_prodi}
                                        </option>
                                    ))}
                                </select>

                                {/* Filter Angkatan */}
                                <select
                                    name="angkatan"
                                    onChange={(e) => handleFilterChange(e)}
                                    className="py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua Angkatan</option>
                                    {angkatan.map((item, index) => (
                                        <option value={item} key={index}>
                                            {item}
                                        </option>
                                    ))}
                                </select>

                                {/* Filter Tahun */}
                                <select
                                    name="tahun"
                                    onChange={(e) => handleFilterChange(e)}
                                    className="py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua Tahun</option>
                                    {getFiveYears().map((item, index) => (
                                        <option value={item} key={index}>
                                            {item}
                                        </option>
                                    ))}
                                </select>

                                {/* Tombol Export */}
                                <button
                                    onClick={(e) => handleExport(tabValue)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold ml-auto"
                                >
                                    Unduh
                                </button>
                            </div>
                        </div>
                        <div>
                            {tabValue == "Pemenang" ? (
                                <TabelTabPrestasi
                                    dataPemenang={dataPemenang}
                                    filters={filters}
                                    refs={exportPemenang}
                                />
                            ) : (
                                <TabelTabPartisipasi
                                    dataPendaftar={dataPendaftar}
                                    filters={filters}
                                    refs={exportPendaftar}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
};

export default LaporanLomba;
