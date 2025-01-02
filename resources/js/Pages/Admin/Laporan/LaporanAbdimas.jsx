import CardStatis from "@/Components/Laporan/Abdimas/CardStatis";
import TabelTabPendaftar from "@/Components/Laporan/Abdimas/TabelTabPendaftar";
import TabelTabPenerima from "@/Components/Laporan/Abdimas/TabelTabPenerima";
import NavbarAdmin from "@/Components/NavbarAdmin";
import React, { useState } from "react";

const LaporanAbdimas = ({
    abdimasRegistrantsCount,
    abdimasRecipientsCount,
    user,
    pendaftar,
    penerima,
}) => {
    console.log(abdimasRegistrantsCount, abdimasRecipientsCount);
    const [tabValue, settabValue] = useState("Penerima");
    return (
        <body>
            <NavbarAdmin user={user} />
            <div class="pl-72 w-full">
                <div class="container px-4 py-8 w-full">
                    <h1 class="text-3xl font-bold text-black mt-16 mb-6">
                        Laporan Pengabdian Masyarakat
                    </h1>
                    <CardStatis
                        abdimasRegistrantsCount={abdimasRegistrantsCount}
                        abdimasRecipientsCount={abdimasRecipientsCount}
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
                                <button class="bg-white text-green-500 px-4 py-1 border border-green-500 rounded-md font-semibold">
                                    Filter
                                </button>
                                <button class="bg-green-500 text-white px-4 py-1 rounded-md font-semibold">
                                    <p>Unduh</p>
                                </button>
                            </div>
                        </div>
                        <div class="overflow-x-auto">
                            {tabValue == "Penerima" ? (
                                <TabelTabPenerima data={penerima} />
                            ) : (
                                <TabelTabPendaftar data={pendaftar} />
                            )}
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
            </div>
        </body>
    );
};

export default LaporanAbdimas;
