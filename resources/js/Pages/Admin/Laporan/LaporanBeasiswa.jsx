import React, { useState } from "react";
import { Search } from "lucide-react";
import { getFiveYears } from "@/lib/helper";
import NavbarAdmin from "@/Components/NavbarAdmin";
import CardStatis from "@/Components/Laporan/Beasiswa/CardStatis";
import TabelTabPendaftar from "@/Components/Laporan/Beasiswa/TabelTabPendaftar";
import TabelTabPenerima from "@/Components/Laporan/Beasiswa/TabelTabPenerima";

const LaporanBeasiswa = ({
    scholarshipRegistrantsCount,
    scholarshipRecipientsCount,
    user,
    dataPendaftar,
    dataPenerima,
    prodi,
    angkatan,
    jenis
}) => {
    const [tabValue, settabValue] = useState("Penerima");
    const [exportPendaftar, setExportPendaftar] = useState(false);
    const [exportPenerima, setExportPenerima] = useState(false);

    const [penerimaCount, setPenerimaCount] = useState(
        dataPenerima.filter((item) => item.is_validated === true).length
    );
    const [pesertaCount, setPesertaCount] = useState(dataPendaftar.length);

    const [filters, setFilters] = useState({
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
            setPenerimaCount(
                dataPenerima.filter(
                    (item) =>
                        item.is_validated === true &&
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
        if (val === "Penerima") {
            setExportPenerima(true);
            setTimeout(() => {
                setExportPenerima(false);
            }, 100);
        } else {
            setExportPendaftar(true);
            setTimeout(() => {
                setExportPendaftar(false);
            }, 100);
        }
    };

    return (
        <div>
            <NavbarAdmin user={user} />
            <div class="pl-72 w-full">
                <div class="container px-4 py-8 w-full">
                    <h1 class="text-3xl font-bold text-black mt-16 mb-6">
                        Laporan Beasiswa
                    </h1>
                    <CardStatis
                        scholarshipRegistrantsCount={pesertaCount}
                        scholarshipRecipientsCount={penerimaCount}
                    />
                    <div class="bg-white p-4 rounded-lg shadow-lg mb-6">
                        <div class="flex items-center mb-4">
                            <button
                                onClick={() => {
                                    settabValue("Penerima");
                                }}
                                className={`${
                                    tabValue === "Penerima"
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 text-gray-700"
                                } py-1.5 px-2 w-[140px] rounded-l-md duration-300`}
                            >
                                Penerima
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
                                Pendaftar
                            </button>
                        </div>
                        <div class="flex justify-between items-center relative w-full flex-wrap">
                            <div class="flex items-center justify-between mb-4">
                                <div class="relative w-full">
                                    <input
                                        name="nama"
                                        onChange={(e) => handleFilterChange(e)}
                                        type="text"
                                        placeholder="Search"
                                        class="pl-10 py-2 rounded-lg border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                </div>
                            </div>
                            <div class="flex space-x-2 mb-4">
                                <select
                                    name="jenis"
                                    onChange={(e) => handleFilterChange(e)}
                                    className="py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua Jenis Beasiswa</option>
                                    {jenis.map((item, index) => (
                                        <option value={item} key={index}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
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
                                <button
                                    onClick={(e) => handleExport(tabValue)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold"
                                >
                                    Unduh
                                </button>
                            </div>
                        </div>

                        <div>
                            {tabValue == "Penerima" ? (
                                <TabelTabPenerima
                                    dataPenerima={dataPenerima}
                                    filters={filters}
                                    refs={exportPenerima}
                                />
                            ) : (
                                <TabelTabPendaftar
                                    dataPendaftar={dataPendaftar}
                                    filters={filters}
                                    refs={exportPendaftar}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaporanBeasiswa;
