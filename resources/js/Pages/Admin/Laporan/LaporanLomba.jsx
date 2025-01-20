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
        prodi: "",
        angkatan: "",
        nama: "",
        tahun: "",
        tingkat: "",
        bidang: "",
        jenis: "",
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
                    {/* <div class="self-stretch p-6 bg-white rounded-lg border-2 border-neutral-100 flex-col justify-start items-start gap-8 flex">
                        <div class="justify-start items-start gap-3 inline-flex">
                            <div class="text-[#2d3036] text-xl font-semibold leading-7">
                                REKAP JUARA
                            </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-[#d1d3d8] grid grid-cols-3 gap-4 w-full">
                            {rekapData.map((item, index) => {
                                return (
                                    <div className="flex flex-col items-center justify-center gap-4 border rounded-md p-4 shadow">
                                        <Bar
                                            key={index}
                                            data={item}
                                            options={barOptions}
                                        />
                                        <h3 className="text-gray-700 text-lg font-medium leading-7">
                                            {Object.keys(rekapJuara)[index]}
                                        </h3>
                                    </div>
                                );
                            })}
                        </div>
                    </div> */}

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
                        <div class="flex justify-between items-center relative w-full flex-wrap">
                            <div class="flex flex-wrap gap-2 mb-2">
                                <div class="relative flex-grow">
                                    <input
                                        name="nama"
                                        onChange={(e) => handleFilterChange(e)}
                                        type="text"
                                        placeholder="Search"
                                        class="pl-10 py-2 rounded-lg border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                </div>
                                <select
                                    name="prodi"
                                    onChange={(e) => handleFilterChange(e)}
                                    class="py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua Prodi</option>
                                    {prodi.map((item, index) => {
                                        return (
                                            <option
                                                value={item.nama_prodi}
                                                key={index}
                                            >
                                                {item.nama_prodi}
                                            </option>
                                        );
                                    })}
                                </select>
                                <select
                                    name="angkatan"
                                    onChange={(e) => handleFilterChange(e)}
                                    class="py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua Angkatan</option>
                                    {angkatan.map((item, index) => {
                                        return (
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        );
                                    })}
                                </select>
                                <select
                                    name="tingkat"
                                    onChange={(e) => handleFilterChange(e)}
                                    class="py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">
                                        Semua Tingkat Prestasi
                                    </option>
                                    {tingkat.map((item, index) => {
                                        return (
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        );
                                    })}
                                </select>
                                <select
                                    name="tahun"
                                    onChange={(e) => handleFilterChange(e)}
                                    class="py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua Tahun</option>
                                    {getFiveYears().map((item, index) => {
                                        return (
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        );
                                    })}
                                </select>
                                <select
                                    name="bidang"
                                    onChange={(e) => handleFilterChange(e)}
                                    class="py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua Bidang</option>
                                    <option value="Ilmiah/Penalaran/Akademik">Ilmiah/Penalaran/Akademik</option>
                                    <option value="Non-Akademik">Non-Akademik</option>
                                    <option value="Olahraga">Olahraga</option>
                                    <option value="Sains">Sains</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                                <select
                                    name="jenis"
                                    onChange={(e) => handleFilterChange(e)}
                                    class="py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua Jenis</option>
                                    <option value="UI/UX Design">
                                        UI/UX Design
                                    </option>
                                    <option value="Front-End Development">
                                        Front-End Development
                                    </option>
                                    <option value="Back-End Development">
                                        Back-End Development
                                    </option>
                                    <option value="Business Plan">
                                        Business Plan
                                    </option>
                                    <option value="Cybersecurity">
                                        Cybersecurity
                                    </option>
                                    <option value="Data Science & Machine Learning">
                                        Data Science & Machine Learning
                                    </option>
                                    <option value="Mobile App Development">
                                        Mobile App Development
                                    </option>
                                    <option value="Game Development">
                                        Game Development
                                    </option>
                                    <option value="Internet of Things (IoT)">
                                        Internet of Things (IoT)
                                    </option>
                                    <option value="Hackathon">Hackathon</option>
                                    <option value="Software Engineering">
                                        Software Engineering
                                    </option>
                                    <option value="Cloud Computing">
                                        Cloud Computing
                                    </option>
                                    <option value="Robotics and Automation">
                                        Robotics and Automation
                                    </option>
                                    <option value="Augmented Reality (AR) / Virtual Reality (VR)">
                                        Augmented Reality (AR) / Virtual Reality
                                        (VR)
                                    </option>
                                    <option value="Blockchain Development">
                                        Blockchain Development
                                    </option>
                                    <option value="Digital Marketing">
                                        Digital Marketing
                                    </option>
                                    <option value="Artificial Intelligence (AI)">
                                        Artificial Intelligence (AI)
                                    </option>
                                    <option value="Big Data Analytics">
                                        Big Data Analytics
                                    </option>
                                    <option value="DevOps">DevOps</option>
                                    <option value="Virtual Assistant Management">
                                        Virtual Assistant Management
                                    </option>
                                    <option value="Web Development">
                                        Web Development
                                    </option>
                                    <option value="Digital Animation">
                                        Digital Animation
                                    </option>
                                    <option value="Full-Stack Development">
                                        Full-Stack Development
                                    </option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                                <button
                                    onClick={(e) => handleExport(tabValue)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold"
                                >
                                    Unduh
                                </button>
                            </div>
                        </div>
                        <div class="overflow-x-auto">
                            {tabValue == "Pendaftar" ? (
                                <TabelTabPartisipasi
                                    dataPendaftar={dataPendaftar}
                                    filters={filters}
                                    refs={exportPendaftar}
                                />
                            ) : (
                                <TabelTabPrestasi
                                    dataPemenang={dataPemenang}
                                    filters={filters}
                                    refs={exportPemenang}
                                />
                            )}
                        </div>
                    </div>

                    <div class="flex justify-between items-center mt-4">
                        <p class="text-gray-500">Rows per page: 10</p>
                        <div class="flex space-x-2 items-center">
                            <button class="px-3 py-1 bg-gray-300 text-gray-700 rounded-md">
                                Prev
                            </button>
                            <p class="text-gray-500">1</p>
                            <p class="text-gray-500">...</p>
                            <button class="px-3 py-1 bg-gray-300 text-gray-700 rounded-md">
                                Next
                            </button>
                        </div>
                        <p class="text-gray-500">Total 1 - 10 of 130</p>
                    </div>
                </div>
            </div>
        </body>
    );
};

export default LaporanLomba;
