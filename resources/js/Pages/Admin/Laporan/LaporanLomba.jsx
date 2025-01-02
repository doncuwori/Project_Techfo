import React, { useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import NavbarAdmin from "@/Components/NavbarAdmin";
import { formatDate, formatDatetimeToIndonesian } from "@/lib/helper";
import CardStatis from "@/Components/Laporan/Lomba/CardStatis";
import { Bar } from "react-chartjs-2";
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
    dataPendaftar,
    dataPemenang,
}) => {
    const [tabValue, settabValue] = useState("Pemenang");

    const rekapData = Object.keys(rekapJuara).map((key) => ({
        labels: Object.keys(rekapJuara[key]),
        datasets: [
            {
                label: "Jumlah Juara",
                data: Object.values(rekapJuara[key]),
                backgroundColor: ["#356a33", "#58b055", "#81cd7d", "#b6e2b4"],
                hoverOffset: 4,
            },
        ],
    }));

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: { boxWidth: 0, padding: 10 },
            },
            tooltip: {
                callbacks: {
                    label: ({ label, raw }) => `${label}: ${raw} Mahasiswa`,
                },
            },
        },
        scales: {
            x: { ticks: { font: { size: 12 } } },
            y: { beginAtZero: true, ticks: { stepSize: 5 } },
        },
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
                        competitionAchievementsCount={
                            competitionAchievementsCount
                        }
                        competitionRegistrantsCount={
                            competitionRegistrantsCount
                        }
                    />
                    <div class="self-stretch p-6 bg-white rounded-lg border-2 border-neutral-100 flex-col justify-start items-start gap-8 flex">
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
                    </div>

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
                                Pendaftar
                            </button>
                        </div>
                        <div class="flex justify-between items-center relative w-full">
                            <div class="flex items-center justify-between mb-4">
                                <div class="relative w-full">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        class="pl-10 py-2 rounded-lg border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <svg
                                        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="bg-white text-green-500 px-4 py-2 border border-green-500 rounded-md font-semibold">
                                    Filter
                                </button>
                                <button class="bg-green-500 text-white px-4 py-2 rounded-md font-semibold">
                                    <p>Unduh</p>
                                </button>
                            </div>
                        </div>
                        <div class="overflow-x-auto">
                            {tabValue == "Pendaftar" ? (
                                <TabelTabPartisipasi
                                    dataPendaftar={dataPendaftar}
                                />
                            ) : (
                                <TabelTabPrestasi dataPemenang={dataPemenang} />
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
