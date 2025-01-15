import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
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

import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    ChartDataLabels
);

const LaporanKeaktifan = ({
    competitionCount,
    scholarshipCount,
    abdimasCount,
    researchCount,
    rekapJuara,
    rekapLomba,
    rekapBeasiswa,
    rekapAbdimas,
    rekapResearch,
    rekapAbdimasLolos,
    rekapResearchLolos,
    arrayFundingAbdimas,
    arrayFundingPenelitian,
}) => {
    const pieData = {
        labels: Object.keys(rekapLomba),
        datasets: [
            {
                label: "Program Studi",
                data: Object.values(rekapLomba),
                backgroundColor: ["#356a33", "#58b055", "#81cd7d", "#b6e2b4"],
                hoverOffset: 4,
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: { position: "right" },
            tooltip: {
                callbacks: {
                    label: ({ label, raw }) => `${label}: ${raw}`,
                },
            },
            datalabels: {
                display: true,
                color: "#000", // Warna teks
                formatter: (value) => value, // Menampilkan nilai langsung
                font: {
                    weight: "bold",
                },
            },
        },
    };

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

    const barData = {
        labels: Object.keys(rekapBeasiswa),
        datasets: [
            {
                label: "Program Studi",
                data: Object.values(rekapBeasiswa),
                backgroundColor: ["#356a33", "#58b055", "#95d592", "#ceeccd"],
                borderRadius: 10,
            },
        ],
    };

    const abdimasData = {
        labels: Object.keys(rekapAbdimas),
        datasets: [
            {
                label: "Program Studi",
                data: Object.values(rekapAbdimas),
                backgroundColor: ["#356a33", "#58b055", "#95d592", "#ceeccd"],
                borderRadius: 10,
            },
        ],
    };

    const abdimasLolos = {
        labels: Object.keys(rekapAbdimasLolos),
        datasets: [
            {
                label: "Program Studi",
                data: Object.values(rekapAbdimasLolos),
                backgroundColor: ["#356a33", "#58b055", "#95d592", "#ceeccd"],
                borderRadius: 10,
            },
        ],
    };

    const abdimasFunding = {
        labels: Object.keys(arrayFundingAbdimas),
        datasets: [
            {
                label: "Jenis Pendanaan",
                data: Object.values(arrayFundingAbdimas),
                backgroundColor: ["#356a33", "#58b055", "#95d592", "#ceeccd"],
                borderRadius: 10,
            },
        ],
    };

    const penelitianFunding = {
        labels: Object.keys(arrayFundingPenelitian),
        datasets: [
            {
                label: "Jenis Pendanaan",
                data: Object.values(arrayFundingPenelitian),
                backgroundColor: ["#356a33", "#58b055", "#95d592", "#ceeccd"],
                borderRadius: 10,
            },
        ],
    };

    const researchData = {
        labels: Object.keys(rekapResearch),
        datasets: [
            {
                label: "Program Studi",
                data: Object.values(rekapResearch),
                backgroundColor: ["#356a33", "#58b055", "#95d592", "#ceeccd"],
                borderRadius: 10,
            },
        ],
    };

    const researchLolos = {
        labels: Object.keys(rekapResearchLolos),
        datasets: [
            {
                label: "Program Studi",
                data: Object.values(rekapResearchLolos),
                backgroundColor: ["#356a33", "#58b055", "#95d592", "#ceeccd"],
                borderRadius: 10,
            },
        ],
    };

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
            datalabels: {
                display: true,
                color: "#000",
                anchor: "end",
                align: "top",
                formatter: (value) => value,
                font: {
                    size: 12,
                },
            },
        },
        scales: {
            x: { ticks: { font: { size: 12 } } },
            y: { beginAtZero: true, ticks: { stepSize: 5 } },
        },
    };

    const fundingOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: { boxWidth: 0, padding: 10 },
            },
            tooltip: {
                callbacks: {
                    label: ({ label, raw }) => `${label}: ${raw} Program`,
                },
            },
            datalabels: {
                display: true,
                color: "#000",
                anchor: "end",
                align: "top",
                formatter: (value) => value,
                font: {
                    size: 12,
                },
            },
        },
        scales: {
            x: { ticks: { font: { size: 12 } } },
            y: { beginAtZero: true, ticks: { stepSize: 5 } },
        },
    };

    const lineData = {
        labels: [
            "S-1 Informatika",
            "S-1 Sistem Informasi",
            "D-3 Sistem Informasi",
            "S-1 Sains Data",
        ],
        datasets: [
            {
                label: "Prestasi Lomba Mahasiswa",
                data: [5, 15, 10, 20],
                fill: false,
                borderColor: "#eca00c",
                tension: 0,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    boxWidth: 0,
                    padding: 10,
                },
            },
            tooltip: { mode: "index", intersect: false },
        },
        scales: {
            x: { title: { display: true, text: "Jurusan" } },
            y: {
                title: { display: true, text: "Jumlah Prestasi" },
                min: 0,
                ticks: {
                    stepSize: 5,
                },
            },
        },
    };

    const rekapLombaData = {
        labels: [
            "Juara 1",
            "Juara 2",
            "Juara 3",
            "Juara Umum",
            "Juara Favorit",
            "Juara Harapan",
            "Lainnya",
        ],
        datasets: [
            {
                label: "Jumlah Prestasi",
                data: [90, 157, 60, 35, 50, 20, 10], // Example data
                backgroundColor: [
                    "#b44621",
                    "#fe632e",
                    "#fe9673",
                    "#ffcfbe",
                    "#81cd7d",
                    "#58b055",
                    "#356a33",
                ],
                borderRadius: 5,
            },
        ],
    };

    const rekapLombaOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
        },
        scales: {
            x: { title: { display: true, text: "Kategori Juara" } },
            y: {
                beginAtZero: true,
                title: { display: true, text: "Jumlah" },
                ticks: { stepSize: 20 }, // Adjust as needed
            },
        },
    };

    return (
        <div>
            <main className="container mx-auto px-4 py-8 relative z-10">
                <div className="min-h-[360px] p-8 bg-white rounded-lg border-2 border-gray-300 shadow-lg flex flex-col gap-8">
                    <div className="w-full mt-6">
                        <h2 className="text-xl font-semibold">
                            Laporan Keaktifan
                        </h2>
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
                            ].map(
                                ({ label, icon, count, status1, status2 }) => (
                                    <div
                                        key={label}
                                        className="bg-orange-100 border-2 border-neutral-200 rounded-lg p-6 flex items-center flex-col sm:flex-row"
                                    >
                                        <div className="text-5xl ml-2">
                                            {icon}
                                        </div>
                                        <div className="ml-0 sm:ml-12 text-center">
                                            <p className="font-semibold">
                                                {label}
                                            </p>
                                            <p className="text-[#2d3036] text-2xl font-medium leading-10">
                                                {count}
                                            </p>
                                            <p className="text-gray-600 text-xs">
                                                {status1}/{status2}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <div className="w-full mt-6">
                        <h2 className="text-xl font-semibold text-left mb-4">
                            Rekap Juara Lomba
                        </h2>
                        <div className="p-4 bg-white rounded-lg border border-[#d1d3d8] grid grid-cols-2 gap-4">
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

                    <div className="flex flex-col md:flex-row gap-8 mt-6">
                        <div className="w-full">
                            <h2 className="text-xl font-semibold text-left mb-4">
                                Prestasi Lomba Mahasiswa
                            </h2>
                            <div className="h-96 p-4 bg-white rounded-lg border border-[#d1d3d8] relative">
                                <div className="w-full h-full flex justify-center items-center">
                                    <Pie data={pieData} options={pieOptions} />
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            <h2 className="text-xl font-semibold text-left mb-4">
                                Mahasiswa Penerima Beasiswa
                            </h2>
                            <div className="h-96 p-4 bg-white rounded-lg border border-[#d1d3d8] relative">
                                <div className="w-full h-full flex justify-center items-center">
                                    <Bar data={barData} options={barOptions} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 mt-6">
                        <div className="w-full">
                            <h2 className="text-xl font-semibold text-left mb-4">
                                Mahasiswa Mendaftar Pengabdian Masyarakat
                            </h2>
                            <div className="h-96 p-4 bg-white rounded-lg border border-[#d1d3d8] relative">
                                <div className="w-full h-full flex justify-center items-center">
                                    <Bar
                                        data={abdimasData}
                                        options={barOptions}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <h2 className="text-xl font-semibold text-left mb-4">
                                Mahasiswa Mendaftar Penelitian
                            </h2>
                            <div className="h-96 p-4 bg-white rounded-lg border border-[#d1d3d8] relative">
                                <div className="w-full h-full flex justify-center items-center">
                                    <Bar
                                        data={researchData}
                                        options={barOptions}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 mt-6">
                        <div className="w-full">
                            <h2 className="text-xl font-semibold text-left mb-4">
                                Mahasiswa Lolos Pengabdian Masyarakat
                            </h2>
                            <div className="h-96 p-4 bg-white rounded-lg border border-[#d1d3d8] relative">
                                <div className="w-full h-full flex justify-center items-center">
                                    <Bar
                                        data={abdimasLolos}
                                        options={barOptions}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <h2 className="text-xl font-semibold text-left mb-4">
                                Mahasiswa Lolos Penelitian
                            </h2>
                            <div className="h-96 p-4 bg-white rounded-lg border border-[#d1d3d8] relative">
                                <div className="w-full h-full flex justify-center items-center">
                                    <Bar
                                        data={researchLolos}
                                        options={barOptions}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 mt-6">
                        <div className="w-full">
                            <h2 className="text-xl font-semibold text-left mb-4">
                                Grafik Pendanaan Pengabdian Masyarakat
                            </h2>
                            <div className="h-96 p-4 bg-white rounded-lg border border-[#d1d3d8] relative">
                                <div className="w-full h-full flex justify-center items-center">
                                    <Bar
                                        data={abdimasFunding}
                                        options={fundingOptions}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <h2 className="text-xl font-semibold text-left mb-4">
                                Grafik Pendanaan Penelitian
                            </h2>
                            <div className="h-96 p-4 bg-white rounded-lg border border-[#d1d3d8] relative">
                                <div className="w-full h-full flex justify-center items-center">
                                    <Bar
                                        data={penelitianFunding}
                                        options={fundingOptions}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LaporanKeaktifan;
