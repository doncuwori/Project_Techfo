import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import SearchableSelect from "@/Components/SearchableSelect";
import PernyataanLegalitas from "@/Components/PernyataanLegalitas";

export const TabLolosBeasiswaFill = ({ dataFill }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        id_scholarship_registrant: dataFill.id,
        proof_scan_url: "",
        poster_url: "",
    });

    const [scanBuktiFile, setScanBuktiFile] = useState(null);
    const [posterKegiatan, setPosterKegiatan] = useState(null);

    const handleFileScanBuktiChange = (event) => {
        const file = event.target.files[0];
        setScanBuktiFile(file);
        setData("proof_scan_url", file);
    };

    const handlePosterKegiatanChange = (event) => {
        const file = event.target.files[0];
        setPosterKegiatan(file);
        setData("poster_url", file);
    };

    const handleRemoveScanBuktiFile = () => {
        setScanBuktiFile(null);
        document.getElementById("scanBuktiInput").value = null;
    };

    const handleRemovePosterKegiatan = () => {
        setPosterKegiatan(null);
        document.getElementById("posterInput").value = null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("scholarship-recipient.fill-store"), {
            onSuccess: (res) => {
                console.log("success");
                reset();
                toast.success("Pendataan Penerima Beasiswa Berhasil Dibuat!");
            },
            onError: (errors) => {
                toast.error("Pendataan Penerima Beasiswa Gagal Dibuat!");
                console.error(errors);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Data Lolos Beasiswa</h2>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Nama Beasiswa<span className="text-red-600">*</span>
                    </label>
                    <input
                        disabled
                        className="w-full border rounded-lg px-4 bg-gray-100"
                        value={dataFill.name}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="type"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Jenis Beasiswa<span className="text-red-600">*</span>
                    </label>
                    <input
                        disabled
                        className="w-full border rounded-lg px-4 bg-gray-100"
                        value={dataFill.type}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Penyelenggara<span className="text-red-600">*</span>
                    </label>
                    <input
                        disabled
                        className="w-full border rounded-lg px-4 bg-gray-100"
                        value={dataFill.organizer}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="host_country"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Negara Penyelenggara
                        <span className="text-red-600">*</span>
                    </label>
                    <input
                        disabled
                        className="w-full border rounded-lg px-4 bg-gray-100"
                        value={dataFill.country.country_name}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="event_date_start"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Waktu Pelaksanaan Dimulai
                        <span className="text-red-600">*</span>
                    </label>
                    <input
                        disabled
                        className="w-full border rounded-lg px-4 bg-gray-100"
                        value={dataFill.event_date_start}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="event_date_end"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Waktu Pelaksanaan Berakhir
                        <span className="text-red-600">*</span>
                    </label>
                    <input
                        disabled
                        className="w-full border rounded-lg px-4 bg-gray-100"
                        value={dataFill.event_date_end}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Deskripsi Kegiatan
                        <span className="text-red-600">*</span>
                    </label>
                    <textarea
                        disabled
                        value={dataFill.description}
                        className="w-full border rounded-lg px-4 bg-gray-100"
                        placeholder="Write text here..."
                    ></textarea>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">
                    Bukti Dokumen
                </h2>
                {/* Scan Bukti */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Scan Bukti<span className="text-red-600">*</span>
                    </label>
                    <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center">
                        <p>Click to upload or drag and drop</p>
                        <p className="text-gray-500">Max. file size: 10MB</p>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            className="hidden"
                            id="scan-bukti"
                            onChange={handleFileScanBuktiChange}
                        />
                        <label
                            htmlFor="scan-bukti"
                            className="mt-2 bg-green-500 text-white py-1 px-4 rounded-lg cursor-pointer inline-block"
                        >
                            Browse File
                        </label>
                        {scanBuktiFile && (
                            <div className="mt-4 flex items-center justify-center">
                                <p className="text-green-500 mr-2">
                                    {scanBuktiFile.name}
                                </p>
                                <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={handleRemoveScanBuktiFile}
                                    aria-label="Remove file"
                                >
                                    &times;
                                </button>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-500 mt-2">
                        Ketentuan file Poster Kegiatan yang diunggah:
                    </p>
                    <ul className="text-gray-500 list-disc list-inside">
                        <li>
                            Detail scan berupa bukti atau dokumen penerima
                            beasiswa.
                        </li>
                        <li>
                            Tipe file yang dapat diunggah antara lain: .jpg,
                            .jpeg, .png;
                        </li>
                        <li>Ukuran file maksimal 1MB.</li>
                    </ul>
                </div>

                {/* Poster Kegiatan */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Poster Kegiatan<span className="text-red-600">*</span>
                    </label>
                    <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center">
                        <p>Click to upload or drag and drop</p>
                        <p className="text-gray-500">Max. file size: 10MB</p>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="hidden"
                            id="poster-kegiatan"
                            onChange={handlePosterKegiatanChange}
                        />
                        <label
                            htmlFor="poster-kegiatan"
                            className="mt-2 bg-green-500 text-white py-1 px-4 rounded-lg cursor-pointer inline-block"
                        >
                            Browse File
                        </label>
                        {posterKegiatan && (
                            <div className="mt-4 flex items-center justify-center">
                                <p className="text-green-500 mr-2">
                                    {posterKegiatan.name}
                                </p>
                                <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={handleRemovePosterKegiatan}
                                    aria-label="Remove file"
                                >
                                    &times;
                                </button>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-500 mt-2">
                        Ketentuan file Poster Kegiatan yang diunggah:
                    </p>
                    <ul className="text-gray-500 list-disc list-inside">
                        <li>
                            Poster beasiswa yang diikuti, menunjukkan nama
                            beasiswa;
                        </li>
                        <li>
                            Tipe file yang dapat diunggah antara lain: .jpg,
                            .jpeg, .png;
                        </li>
                        <li>Ukuran file maksimal 1MB.</li>
                    </ul>
                </div>
            </section>

            <PernyataanLegalitas />

            <div className="flex justify-end w-full">
                <button
                    type="submit"
                    className="mt-2 bg-orange-500 text-white py-1 px-4 rounded-lg"
                    disabled={processing}
                >
                    {processing ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
};
