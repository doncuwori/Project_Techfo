import { useForm, usePage } from "@inertiajs/react";
import { Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SearchableSelect from "@/Components/SearchableSelect";
import PernyataanLegalitas from "@/Components/PernyataanLegalitas";

export const TabPrestasiLombaFill = ({ dataFill }) => {
    const [member, setMember] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        id_competition_registrant: dataFill.id,
        degree: "",
        proof_scan_url: "",
        event_photo_url: "",
        report_url: "",
    });

    const [memberNim, setMemberNim] = useState("");
    const [fetchedUsers, setFetchedUsers] = useState([]);
    const user = usePage().props.auth.user;

    const [fields, setFields] = useState([{ value: "" }]);

    const handleCheckbox = (e) => {
        setData("is_group", e.target.checked);
    };

    const [scanBuktiFile, setScanBuktiFile] = useState(null);
    const [kegiatanFile, setKegiatanFile] = useState(null);
    const [laporanFile, setLaporanFile] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const handleFileScanBuktiChange = (event) => {
        const file = event.target.files[0];
        setScanBuktiFile(file);
        setData("proof_scan_url", file);
    };

    const handleFileKegiatanChange = (event) => {
        const file = event.target.files[0];
        setKegiatanFile(file);
        setData("event_photo_url", file);
    };

    const handleFileLaporanChange = (event) => {
        const file = event.target.files[0];
        setLaporanFile(file);
        setData("report_url", file);
    };

    const handleDropScanBuktiFile = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (
            file &&
            file.size <= 1 * 1024 * 1024 &&
            /\.(jpg|jpeg|png|pdf)$/i.test(file.name)
        ) {
            setScanBuktiFile(file);
            setData("proof_scan_url", file);
        } else {
            toast.error("File tidak valid atau melebihi ukuran maksimal 1MB.");
        }
    };

    const handleDropKegiatanFile = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (
            file &&
            file.size <= 1 * 1024 * 1024 &&
            /\.(jpg|jpeg|png)$/i.test(file.name)
        ) {
            setKegiatanFile(file);
            setData("event_photo_url", file);
        } else {
            toast.error("File tidak valid atau melebihi ukuran maksimal 1MB.");
        }
    };

    const handleDropLaporanFile = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (file && file.size <= 1 * 1024 * 1024 && /\.pdf$/i.test(file.name)) {
            setLaporanFile(file);
            setData("report_url", file);
        } else {
            toast.error("File tidak valid atau melebihi ukuran maksimal 1MB.");
        }
    };

    const handleRemoveScanBuktiFile = () => {
        setScanBuktiFile(null);
        // Clear the file input field for scan bukti
        document.getElementById("scanBuktiInput").value = null;
    };

    const handleRemoveKegiatanFile = () => {
        setKegiatanFile(null);
        document.getElementById("kegiatanInput").value = null;
    };

    const handleRemoveLaporanFile = () => {
        setLaporanFile(null);
        document.getElementById("laporanInput").value = null;
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("competition-achievement.fill-store"), {
            onSuccess: (res) => {
                console.log("success");
                reset();
                toast.success("Pendataan Prestasi Lomba Berhasil Dibuat!");
            },
            onError: (errors) => {
                toast.error("Pendataan Prestasi Lomba Gagal DIbuat!");
                console.error(errors);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">
                    Data Prestasi Mahasiswa
                </h2>
                <div className="mb-4"></div>
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
                    <label className="block text-gray-700 font-bold mb-2">
                        Delegasi ORMAWA<span className="text-red-600">*</span>
                    </label>
                    <input
                        disabled
                        className="w-full border rounded-lg px-4 bg-gray-100"
                        value={dataFill.ormawa_delegation}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Nama Kegiatan<span className="text-red-600">*</span>
                    </label>
                    <input
                        disabled
                        className="w-full border rounded-lg px-4 bg-gray-100"
                        value={dataFill.activity_name}
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col w-full">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Tingkat Prestasi
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                disabled
                                className="w-full border rounded-lg px-4 bg-gray-100"
                                value={dataFill.scope}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Gelar<span className="text-red-600">*</span>
                            </label>
                            <select
                                onChange={(e) => {
                                    setData("degree", e.target.value);
                                }}
                                value={data.degree}
                                className="w-full border rounded-lg px-4"
                            >
                                <option>-- Pilih Gelar --</option>
                                <option>Juara Harapan I</option>
                                <option>Juara Harapan II</option>
                                <option>Juara Harapan III</option>
                                <option>Juara I</option>
                                <option>Juara II</option>
                                <option>Juara III</option>
                                <option>Medali Emas</option>
                                <option>Medali Perak</option>
                                <option>Medali Perunggu</option>
                                <option>Penerima Hibah</option>
                                <option>Terbaik</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Bidang<span className="text-red-600">*</span>
                            </label>
                            <input
                                disabled
                                className="w-full border rounded-lg px-4 bg-gray-100"
                                value={dataFill.field}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Dosen Pembimbing/Pendamping
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                disabled
                                className="w-full border rounded-lg px-4 bg-gray-100"
                                value={dataFill.dosen.nama}
                            />
                            {/* <input
                                type="text"
                                onChange={(e) => {
                                    setData("mentor_name", e.target.value);
                                }}
                                value={data.mentor_name}
                                className="w-full border rounded-lg px-4"
                                placeholder="Tuliskan nama dosen pembimbing/pendamping..."
                            /> */}
                        </div>
                    </div>
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
                    <label className="block text-gray-700 font-bold mb-2">
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
                    <label className="block text-gray-700 font-bold mb-2">
                        Tempat Pelaksanaan
                        <span className="text-red-600">*</span>
                    </label>
                    <input
                        disabled
                        className="w-full border rounded-lg px-4 bg-gray-100"
                        value={dataFill.location}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Waktu Pelaksanaan Dimulai
                        <span className="text-red-600">*</span>
                    </label>
                    <input
                        value={dataFill.activity_date_start}
                        type="date"
                        disabled
                        className="w-full border rounded-lg px-4 bg-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Waktu Pelaksanaan Berakhir
                        <span className="text-red-600">*</span>
                    </label>
                    <input
                        value={dataFill.activity_date_end}
                        type="date"
                        disabled
                        className="w-full border rounded-lg px-4 bg-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Deskripsi Kegiatan
                        <span className="text-red-600">*</span>
                    </label>
                    <textarea
                        value={dataFill.description}
                        disabled
                        className="w-full border rounded-lg px-4 bg-gray-100"
                        placeholder="Write text here..."
                    ></textarea>
                </div>
            </section>
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Bukti Dokumen</h2>

                {/* Upload Scan Bukti */}
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
                            <Upload className="text-gray-500 w-7 h-7 mb-2" />
                            <p>Click to upload or drag and drop</p>
                        </div>
                        <p>Click to upload or drag and drop</p>
                        <p className="text-gray-500">Max. file size: 1MB</p>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            className="hidden"
                            id="scanBuktiInput"
                            onChange={handleFileScanBuktiChange}
                        />
                        <label
                            htmlFor="scanBuktiInput"
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
                        Ketentuan file scan bukti yang diunggah:
                    </p>
                    <ul className="text-gray-500 list-disc list-inside">
                        <li>
                            Detail scan bukti berupa
                            Piagam/Sertifikat/Penghargaan atau Dokumen hasil
                            prestasi yang telah disahkan dengan stempel basah;
                        </li>
                        <li>
                            Berkas yang diunggah dalam format: .pdf, .jpg,
                            .jpeg, .png;
                        </li>
                        <li>Ukuran maksimal setiap file adalah 1MB.</li>
                    </ul>
                </div>

                {/* Upload Foto Kegiatan */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Foto Kegiatan<span className="text-red-600">*</span>
                    </label>
                    <div
                        className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDropKegiatanFile}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Upload className="text-gray-500 w-7 h-7 mb-2" />
                            <p>Click to upload or drag and drop</p>
                        </div>
                        <p className="text-gray-500">Max. file size: 1MB</p>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="hidden"
                            id="fotoKegiatanInput"
                            onChange={handleFileKegiatanChange}
                        />
                        <label
                            htmlFor="fotoKegiatanInput"
                            className="mt-2 bg-green-500 text-white py-1 px-4 rounded-lg cursor-pointer inline-block"
                        >
                            Browse File
                        </label>
                        {kegiatanFile && (
                            <div className="mt-4 flex items-center justify-center">
                                <p className="text-green-500 mr-2">
                                    {kegiatanFile.name}
                                </p>
                                <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={handleRemoveKegiatanFile}
                                    aria-label="Remove file"
                                >
                                    &times;
                                </button>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-500 mt-2">
                        Ketentuan file foto kegiatan yang diunggah:
                    </p>
                    <ul className="text-gray-500 list-disc list-inside">
                        <li>
                            Foto Kegiatan saat menerima
                            Piagam/Sertifikat/Penghargaan;
                        </li>
                        <li>
                            Berkas yang diunggah dalam format: .jpg, .jpeg,
                            .png;
                        </li>
                        <li>Ukuran maksimal setiap file adalah 1MB.</li>
                    </ul>
                </div>

                {/* Upload LPJ Kegiatan */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Laporan Pertanggung Jawaban (LPJ) Kegiatan
                        <span className="text-red-600">*</span>
                    </label>
                    <div
                        className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDropLaporanFile}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Upload className="text-gray-500 w-7 h-7 mb-2" />
                            <p>Click to upload or drag and drop</p>
                        </div>
                        <p className="text-gray-500">Max. file size: 1MB</p>
                        <input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            id="laporanInput"
                            onChange={handleFileLaporanChange}
                        />
                        <label
                            htmlFor="laporanInput"
                            className="mt-2 bg-green-500 text-white py-1 px-4 rounded-lg cursor-pointer inline-block"
                        >
                            Browse File
                        </label>
                        {laporanFile && (
                            <div className="mt-4 flex items-center justify-center">
                                <p className="text-green-500 mr-2">
                                    {laporanFile.name}
                                </p>
                                <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={handleRemoveLaporanFile}
                                    aria-label="Remove file"
                                >
                                    &times;
                                </button>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-500 mt-2">
                        Ketentuan file LPJ kegiatan yang diunggah:
                    </p>
                    <ul className="text-gray-500 list-disc list-inside">
                        <li>
                            Silakan unduh format LPJ berikut{" "}
                            <a
                                href="https://docs.google.com/document/d/1_ZemBsFWiwQ7EWc6J5oI3FC_cDtwlKEA/edit?usp=sharing&ouid=102283645336565718024&rtpof=true&sd=true"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                unduh file LPJ di sini{" "}
                            </a>
                            dan contoh penyusunan LPJ{" "}
                            <a
                                href="https://drive.google.com/file/d/1gVZcW6n81Neiyqts_mEFYTSCDbwOqF-g/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                lihat di sini;
                            </a>
                        </li>
                        <li>Berkas yang diunggah dalam format: .pdf;</li>
                        <li>Ukuran maksimal setiap file adalah 1MB.</li>
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
