import React from "react";
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
}) => {

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
                    <h1 class="text-3xl font-bold text-black mb-6">
                        Pusat Informasi
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
                        <div class="flex items-center space-x-2 mb-4">
                            <button class="bg-green-500 text-white px-4 py-2 rounded-md font-semibold">
                                Penerima
                            </button>
                            <button class="bg-white text-green-500 px-4 py-2 border border-green-500 rounded-md font-semibold">
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
                            <table class="min-w-full divide-y divide-gray-200 ">
                                <thead>
                                    <tr>
                                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            No
                                        </th>
                                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            NIM
                                        </th>
                                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama
                                        </th>
                                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Delegasi Ormawa
                                        </th>
                                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Dosen Pembimbing/Pendamping
                                        </th>
                                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Bidang
                                        </th>
                                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Penyelenggara
                                        </th>
                                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Negara Penyelenggara
                                        </th>
                                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tempat Pelaksanaan
                                        </th>
                                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Waktu Pelaksanaan
                                        </th>
                                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Deskripsi Kegiatan
                                        </th>
                                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Scan Bukti
                                        </th>
                                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Foto Kegiatan
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    {registrant.map((item, index) => (
                                        <tr>
                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                {index + 1}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                1234567890
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                John Doe
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                {item.ormawa_delegation}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                {item.mentor_name}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                {item.field}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                {item.organizer}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                {item.host_country}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                {item.location}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                {formatDate(
                                                    item.activity_date_start
                                                )}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                {item.description}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                Bukti.png
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                Kegiatan.png
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
