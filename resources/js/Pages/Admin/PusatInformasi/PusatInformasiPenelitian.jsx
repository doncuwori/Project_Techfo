import React, { useEffect } from "react";
import { FilePenLine } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";
import { formatDate } from "@/lib/helper";
import NavbarAdmin from "@/Components/NavbarAdmin";
import TabelPusatInfo from "@/Components/Laporan/Penelitian/TabelPusatInfo";
import UploadSuratTugas from "@/Components/Laporan/Penelitian/UploadSuratTugas";
import toast, { Toaster } from "react-hot-toast";

const PusatInformasiPenelitian = ({ user, research }) => {

    const { flash } = usePage().props;

    useEffect(() => {
        toast.dismiss();
        if (flash.success) {
            toast.success(flash.success);
        } else if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const { data, setData, post, processing, errors, reset } = useForm({
        id_research_registrant: [],
    });

    const handleMahasiswaChange = (value) => {
        setData("id_research_registrant", value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Pastikan semua mahasiswa memiliki status
        const finalData = data.id_research_registrant.map((item) => {
            return {
                ...item,
                value: item.value || "rejected", // Default value is "rejected"
            };
        });

        post(route("pusatPenelitian.register"), {
            data: { id_research_registrant: finalData },
            onSuccess: (res) => {
                console.log("success");
                reset();
                toast.success(
                    "Pendaftaran Pengabdian Masyarakat Berhasil Dibuat"
                );
            },
            onError: (errors) => {
                toast.error("Gagal Mendaftar Penelitian");
                console.error(errors);
            },
        });
    };

    return (
        <body>
            <Toaster position="top-right" reverseOrder={false} />
            <NavbarAdmin user={user} />

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
                                {research.name}
                            </h3>
                            <a
                                href={route("editInfoPenelitian", research.id)}
                                className="hover:scale-110 transform transition-transform flex items-center gap-3"
                            >
                                <FilePenLine className="ml-4 mb-12 text-black w-6 h-6 hover:text-orange-500" />
                            </a>
                        </div>
                        <div class="mb-4">
                            <p>
                                <strong>Lokasi Kegiatan:</strong>{" "}
                                {research.location}
                            </p>
                            <div class="mt-4">
                                <p>
                                    <strong>Batas Pendaftaran:</strong>
                                    <span class="text-red-500">
                                        {" "}
                                        {formatDate(
                                            research.event_time_start
                                        )}{" "}
                                        - {formatDate(research.event_time_end)}
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
                            <p>
                                {research.total_students_required} Mahasiswa{" "}
                                <b>
                                    (Tersisa{" "}
                                    {Math.max(
                                        0,
                                        research.total_students_required -
                                            research.research_registrant.filter(
                                                (researchRegistrant) =>
                                                    researchRegistrant.status ===
                                                    true
                                            ).length
                                    )}
                                    )
                                </b>
                            </p>
                        </div>

                        <div class="mt-4">
                            <p>
                                <strong>Dosen Penyelenggara:</strong>
                            </p>
                            <ul className="list-disc pl-5">
                                {research.dosen &&
                                    research.dosen.length > 0 && (
                                        <>
                                            {/* Ketua */}
                                            {research.dosen.length === 1 ? (
                                                // Jika hanya satu orang, dia otomatis menjadi ketua
                                                <li key={`leader-0`}>
                                                    {research.dosen[0].nama}{" "}
                                                    <b>(Ketua)</b>
                                                </li>
                                            ) : (
                                                <>
                                                    {/* Ketua berdasarkan ID */}
                                                    {research.dosen
                                                        .filter(
                                                            (dosen) =>
                                                                dosen.id ===
                                                                research.leader
                                                                    .id_dosen
                                                        )
                                                        .map((dosen, index) => (
                                                            <li
                                                                key={`leader-${index}`}
                                                            >
                                                                {dosen.nama}{" "}
                                                                <b>(Ketua)</b>
                                                            </li>
                                                        ))}
                                                    {/* Anggota */}
                                                    {research.dosen
                                                        .filter(
                                                            (dosen) =>
                                                                dosen.id !==
                                                                research.leader
                                                                    .id_dosen
                                                        )
                                                        .map((dosen, index) => (
                                                            <li
                                                                key={`member-${index}`}
                                                            >
                                                                {dosen.nama}
                                                            </li>
                                                        ))}
                                                </>
                                            )}
                                        </>
                                    )}
                            </ul>
                        </div>

                        <div class="mt-4">
                            <p>
                                <strong>Detail Kegiatan:</strong>
                            </p>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: research.description,
                                }}
                            ></p>
                        </div>

                        <UploadSuratTugas research={research} />
                    </div>

                    <div class="mt-6 bg-white shadow-md rounded-lg p-6">
                        <div class="flex justify-between items-center">
                            <h3 class="text-xl font-semibold">
                                Pendaftar Penelitian
                            </h3>
                            {/* <div class="flex items-center">
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
                            </div> */}
                        </div>
                        <TabelPusatInfo
                            data={research.research_registrant}
                            handler={handleMahasiswaChange}
                        />
                        {/* <div class="flex justify-between items-center mt-4">
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
                        </div> */}
                        {research.closed ? (
                            ""
                        ) : (
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={handleSubmit}
                                    class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                >
                                    Simpan
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </body>
    );
};

export default PusatInformasiPenelitian;
