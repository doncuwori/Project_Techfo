import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Upload } from "lucide-react";
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
    const [isChecked, setIsChecked] = useState(false);
    const [fileURL, setFileURL] = useState(null);

    const handleFileScanBuktiChange = (event) => {
        const file = event.target.files[0];

        if (file && file.size > 2097152) {
            toast.error("File tidak valid atau melebihi ukuran maksimal 2MB.");
            return;
        }

        if (file) {
            setScanBuktiFile(file);
            const url = URL.createObjectURL(file);
            setFileURL(url);
            setData("proof_scan_url", file);
        }
    };

    const handlePosterKegiatanChange = (event) => {
        const file = event.target.files[0];

        if (file && file.size > 2097152) {
            toast.error("File tidak valid atau melebihi ukuran maksimal 2MB.");
            return;
        }

        if (file) {
            setPosterKegiatan(file);
            const url = URL.createObjectURL(file);
            setFileURL(url);
            setData("poster_url", file);
        }
    };

    const handleDropScanBuktiFile = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (
            file &&
            file.size <= 2 * 1024 * 1024 &&
            /\.(jpg|jpeg|png|pdf)$/i.test(file.name)
        ) {
            const url = URL.createObjectURL(file);
            setScanBuktiFile(file);
            setFileURL(url);
            setData("proof_scan_url", file);
        } else {
            toast.error("File tidak valid atau melebihi ukuran maksimal 2MB.");
        }
    };

    const handleDropPosterKegiatanFile = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (
            file &&
            file.size <= 2 * 1024 * 1024 &&
            /\.(jpg|jpeg|png)$/i.test(file.name)
        ) {
            const url = URL.createObjectURL(file);
            setPosterKegiatan(file);
            setFileURL(url);
            setData("poster_url", file);
        } else {
            toast.error("File tidak valid atau melebihi ukuran maksimal 2MB.");
        }
    };

    const handleRemoveScanBuktiFile = () => {
        setScanBuktiFile(null);
        setFileURL(null);
        setData("proof_scan_url", null);
        const scanBuktiInput = document.getElementById("scanBuktiInput");
        if (scanBuktiInput) scanBuktiInput.value = null;
    };

    const handleRemovePosterKegiatan = () => {
        setPosterKegiatan(null);
        setFileURL(null);
        setData("poster_url", null);
        const posterInput = document.getElementById("posterInput");
        if (posterInput) posterInput.value = null;
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
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
                    <label className="block text-gray-700 font-bold mb-2">
                        Nomor Telepon (WhatsApp)
                        <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded-lg p-2 bg-gray-100"
                        placeholder="Masukkan Nomor Telepon Anda"
                        value={dataFill.phone}
                        disabled
                    />
                </div>
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
                <h2 className="text-xl font-bold mb-4">Bukti Dokumen</h2>

                {/* Scan Bukti */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Scan Bukti<span className="text-red-600">*</span>
                    </label>
                    <div
                        className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDropScanBuktiFile}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Upload className="text-gray-500 w-6 h-6 mb-2" />
                            <p>Click to upload or drag and drop</p>
                        </div>
                        <p className="text-gray-500">Max. file size: 2MB</p>
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
                        {scanBuktiFile && fileURL && (
                            <div className="mt-4 flex items-center justify-center">
                                <div>
                                    <a
                                        href={fileURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={fileURL}
                                            alt="Preview"
                                            className="mb-2 max-w-xs mx-auto cursor-pointer"
                                        />
                                    </a>
                                    <div className="flex items-center justify-center space-x-1 mb-2">
                                        <p className="text-green-500">
                                            {scanBuktiFile.name}
                                        </p>
                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-700 ml-4"
                                            onClick={handleRemoveScanBuktiFile}
                                            aria-label="Remove file"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    {/* <a
                                        href={fileURL}
                                        download={selectedFile.name}
                                        className="bg-blue-500 text-white py-1 px-4 rounded-lg"
                                    >
                                        Download File
                                    </a> */}
                                </div>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-500 mt-2">
                        Ketentuan file Bukti Scan yang diunggah:
                    </p>
                    <ul className="text-gray-500 list-disc list-inside">
                        <li>
                            Detail scan berupa bukti atau dokumen penerima
                            beasiswa yang telah disahkan dengan stempel basah;
                        </li>
                        <li>
                            Berkas yang diunggah dalam format: .jpg, .jpeg,
                            .png, .pdf;
                        </li>
                        <li>Ukuran file maksimal 2MB.</li>
                    </ul>
                </div>

                {/* Poster Kegiatan */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Poster Kegiatan<span className="text-red-600">*</span>
                    </label>
                    <div
                        className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDropPosterKegiatanFile}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Upload className="text-gray-500 w-6 h-6 mb-2" />
                            <p>Click to upload or drag and drop</p>
                        </div>
                        <p className="text-gray-500">Max. file size: 2MB</p>
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
                        {posterKegiatan && fileURL && (
                            <div className="mt-4 flex items-center justify-center">
                                <div>
                                    <a
                                        href={fileURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={fileURL}
                                            alt="Preview"
                                            className="mb-2 max-w-xs mx-auto cursor-pointer"
                                        />
                                    </a>
                                    <div className="flex items-center justify-center space-x-1 mb-2">
                                        <p className="text-green-500">
                                            {posterKegiatan.name}
                                        </p>
                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-700 ml-4"
                                            onClick={handleRemovePosterKegiatan}
                                            aria-label="Remove file"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    {/* <a
                                        href={fileURL}
                                        download={selectedFile.name}
                                        className="bg-blue-500 text-white py-1 px-4 rounded-lg"
                                    >
                                        Download File
                                    </a> */}
                                </div>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-500 mt-2">
                        Ketentuan file Poster Kegiatan yang diunggah:
                    </p>
                    <ul className="text-gray-500 list-disc list-inside">
                        <li>
                            Poster kegiatan yang diikuti, menunjukkan nama
                            lomba;
                        </li>
                        <li>
                            Berkas yang diunggah dalam format: .jpg, .jpeg,
                            .png;
                        </li>
                        <li>Ukuran file maksimal 2MB.</li>
                    </ul>
                </div>
            </section>

            <PernyataanLegalitas
                isChecked={isChecked}
                onCheckboxChange={handleCheckboxChange}
            />
            <div className="flex justify-end w-full">
                <button
                    type="submit"
                    className={`mt-2 ${
                        processing || !isChecked
                            ? "bg-gray-400"
                            : "bg-orange-500"
                    } text-white py-1 px-4 rounded-lg`}
                    disabled={processing || !isChecked}
                >
                    {processing ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
};
