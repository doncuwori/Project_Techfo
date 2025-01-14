import React from "react";
import { CalendarDays, CircleUserRound, HandCoins } from "lucide-react";
import { formatDate } from "@/lib/helper";
import { Link } from "@inertiajs/react";

const MainContent = ({ data }) => {
    return (
        <div className="md:w-full p-8 overflow-y-auto">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-[1200px] mx-auto">
                <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
                <div className="mb-4">
                    <h2 className="text-lg mb-2">Diunggah oleh</h2>
                    <div className="flex items-center">
                        <img
                            src="/img/profiledefault.png"
                            className="w-10 h-10 rounded-full mr-2"
                            alt="Profile Picture"
                        />
                        <div>
                            {/* CreatedBy */}
                            {data.dosen && data.dosen.length > 0 && (
                                <p className="text-gray-700">
                                    {data.leader.dosen.nama}
                                </p>
                            )}
                            <p className="text-gray-500">
                                {formatDate(data.created_at)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start mb-4">
                    {data.exist_enroll == true &&
                    data.already_enroll == false ? (
                        <button className="bg-green-200 text-white font-bold py-2 px-4 rounded">
                            Masih ada registrasi menunggu
                        </button>
                    ) : (data.exist_enroll == true &&
                          data.already_enroll == true) ||
                      (data.exist_enroll == false &&
                          data.already_enroll == true) ? (
                        <button className="bg-green-200 text-white font-bold py-2 px-4 rounded">
                            Sudah Daftar
                        </button>
                    ) : (
                        <Link href={route("daftarPenelitian", data.id)}>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Daftar
                            </button>
                        </Link>
                    )}
                    <Link href={route("faq")}>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-4">
                            Buku Panduan
                        </button>
                    </Link>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">
                        Batas Pendaftaran
                    </h2>
                    <div className="flex items-center">
                        <CalendarDays className="w-5 h-5 text-orange-600" />
                        <p className="text-gray-700 ml-2">
                            {formatDate(data.event_time_start)} -{" "}
                            {formatDate(data.event_time_end)}
                        </p>
                    </div>
                </div>
                <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: data.description }}></p>
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">
                        Mahasiswa Yang Dibutuhkan
                    </h2>
                    <div className="flex items-center">
                        <CircleUserRound className="w-5 h-5 text-orange-600" />
                        <p className="text-gray-700 ml-2">
                            {data.total_students_required} Mahasiswa
                        </p>
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Jenis Pendanaan</h2>
                    <div className="flex items-center">
                        <HandCoins className="w-5 h-5 text-orange-600" />
                        <p className="text-gray-700 ml-2">{data.funding}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">
                        Dosen Penyelenggara
                    </h2>
                    <ol className="list-decimal pl-5">
                        {data.dosen && data.dosen.length > 0 && (
                            <>
                                {data.leader?.dosen?.nama && (
                                    <li className="text-gray-700">
                                        {data.leader.dosen.nama} <b>(Ketua)</b>
                                    </li>
                                )}
                                {data.dosen.map((dosen, index) => {
                                    if (
                                        dosen.nama &&
                                        dosen.nama !== data.leader?.dosen?.nama
                                    ) {
                                        return (
                                            <li
                                                key={index}
                                                className="text-gray-700"
                                            >
                                                {dosen.nama}
                                            </li>
                                        );
                                    }
                                    return null;
                                })}
                            </>
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default MainContent;
