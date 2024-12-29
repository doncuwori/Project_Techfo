import NavbarAdmin from "@/Components/NavbarAdmin";
import React from "react";
import { FilePenLine } from "lucide-react";
import TabelPusatInfo from "@/Components/Laporan/Penelitian/TabelPusatInfo";

const PusatInformasiPenelitian = () => {
    return (
        <body>
            <NavbarAdmin />
            <div class="pl-72 w-full">
                <div class="container px-4 py-8 w-full">
                    <h1 class="text-3xl font-bold text-black">
                        Pusat Informasi
                    </h1>
                </div>
                <div class="flex-1 p-6">
                    <div class="bg-white shadow-md rounded-lg p-6">
                        <div class="flex justify-between items-center">
                            <h3 class="text-xl font-semibold mb-4">
                                Optimalisasi Aplikasi E-Commerce sebagai Upaya
                                untuk Meningkatkan Promosi Batik Paoman
                            </h3>
                            <a
                                href={route("dashboardAdmin")}
                                className="hover:scale-110 transform transition-transform flex items-center gap-3"
                            >
                                <FilePenLine className="ml-4 mb-12 text-black w-6 h-6 hover:text-orange-500" />
                            </a>
                        </div>
                        <div class="mb-4">
                            <p>
                                <strong>Lokasi Kegiatan:</strong> Desa Pabean
                                Udik, Indramayu, Indonesia
                            </p>
                            <div class="mt-4">
                                <p>
                                    <strong>Batas Pendaftaran:</strong>
                                    <span class="text-red-500">
                                        1 Juni 2024 - 31 Juni 2024
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div class="mt-4">
                            <p>
                                <strong>
                                    Total Mahasiswa yang Dibutuhkan:
                                </strong>
                            </p>
                            <p>4 orang mahasiswa</p>
                        </div>

                        <div class="mt-4">
                            <p>
                                <strong>Anggota Tim:</strong>
                            </p>
                            <ul class="list-disc ml-5">
                                <li>Eriy Krisnanik S.Kom, M.M.</li>
                                <li>Ika Nurilali, S.Kom, M.Sc.</li>
                            </ul>
                        </div>

                        <div class="mt-4">
                            <p>
                                <strong>Detail Kegiatan:</strong>
                            </p>
                            <p>
                                Pada kegiatan penelitian ini, mahasiswa akan
                                turut serta membantu para dosen dalam melakukan
                                risetnya di Desa Pabean Udik, Indramayu dalam
                                menggunakan aplikasi E-Commerce...
                            </p>
                        </div>

                        <div class="flex justify-end mt-4">
                            <button class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                                + Surat Tugas
                            </button>
                        </div>
                    </div>

                    <div class="mt-6 bg-white shadow-md rounded-lg p-6">
                        <div class="flex justify-between items-center">
                            <h3 class="text-xl font-semibold">
                                Pendaftar Pengabdian Masyarakat
                            </h3>
                            <div class="flex items-center">
                                <span class="text-gray-700 text-center text-12 mr-3">
                                    Masih merekrut?
                                </span>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        class="sr-only peer"
                                    />
                                    <div class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 transition-colors"></div>
                                    <div class="absolute top-1 left-1 w-4 h-4 bg-white border rounded-full transition-transform peer-checked:translate-x-5"></div>
                                </label>
                            </div>
                        </div>
                        <TabelPusatInfo />
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

export default PusatInformasiPenelitian;
