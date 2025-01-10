import { useForm, usePage } from "@inertiajs/react";
import { Plus, Trash, X } from "lucide-react";
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

    const handleRemoveScanBuktiFile = () => {
        setScanBuktiFile(null);
        // Clear the file input field for scan bukti
        document.getElementById("scanBuktiInput").value = null;
    };

    const handleRemoveKegiatanFile = () => {
        setKegiatanFile(null);
        // Clear the file input field for file kegiatan
        document.getElementById("kegiatanInput").value = null;
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
                <div className="mb-4">
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Delegasi ORMAWA<span className="text-red-600">*</span>
                    </label>
                    <input disabled className="w-full border rounded-lg px-4 bg-gray-100" value={dataFill.ormawa_delegation}/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Nama Kegiatan<span className="text-red-600">*</span>
                    </label>
                    <input disabled className="w-full border rounded-lg px-4 bg-gray-100" value={dataFill.activity_name}/>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col w-full">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Tingkat Prestasi
                                <span className="text-red-600">*</span>
                            </label>
                            <input disabled className="w-full border rounded-lg px-4 bg-gray-100" value={dataFill.scope}/>
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
                                <option>Penerima Hibah</option>
                                <option>Terbaik</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Bidang<span className="text-red-600">*</span>
                            </label>
                            <input disabled className="w-full border rounded-lg px-4 bg-gray-100" value={dataFill.field}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Dosen Pembimbing/Pendamping
                                <span className="text-red-600">*</span>
                            </label>
                            <input disabled className="w-full border rounded-lg px-4 bg-gray-100" value={dataFill.dosen.nama}/>
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
                    <input disabled className="w-full border rounded-lg px-4 bg-gray-100" value={dataFill.organizer}/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Negara Penyelenggara
                        <span className="text-red-600">*</span>
                    </label>
                    <input disabled className="w-full border rounded-lg px-4 bg-gray-100" value={dataFill.country.country_name}/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Tempat Pelaksanaan
                        <span className="text-red-600">*</span>
                    </label>
                    <input disabled className="w-full border rounded-lg px-4 bg-gray-100" value={dataFill.location}/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Waktu Pelaksanaan Dimulai
                        <span className="text-red-600">*</span>
                    </label>
                    <input
                        value={dataFill.activity_date_start}
                        type="date"
                        disabled className="w-full border rounded-lg px-4 bg-gray-100"
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
                        disabled className="w-full border rounded-lg px-4 bg-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Deskripsi Kegiatan
                        <span className="text-red-600">*</span>
                    </label>
                    <textarea
                        value={dataFill.description}
                        disabled className="w-full border rounded-lg px-4 bg-gray-100"
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
                    <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center">
                        <p>Click to upload or drag and drop</p>
                        <p className="text-gray-500">Max. file size: 10MB</p>
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
                            Detail scan berupa Piagam/Sertifikat/Penghargaan
                            atau dokumen hasil prestasi.
                        </li>
                        <li>
                            Berkas yang diunggah dalam format: .pdf, .jpeg,
                            .png.
                        </li>
                        <li>Ukuran maksimal setiap file adalah 10MB.</li>
                    </ul>
                </div>

                {/* Upload Foto Kegiatan */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Foto Kegiatan<span className="text-red-600">*</span>
                    </label>
                    <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center">
                        <p>Click to upload or drag and drop</p>
                        <p className="text-gray-500">Max. file size: 10MB</p>
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
                            Berkas yang diunggah dalam format file: .jpeg, .png.
                        </li>
                        <li>Ukuran maksimal setiap file adalah 10MB.</li>
                    </ul>
                </div>
            </section>

            <PernyataanLegalitas />
            <div className="flex justify-end w-full">
                <button
                    type="submit"
                    className={`mt-2 ${
                        processing ? "bg-gray-400" : "bg-orange-500"
                    }  text-white py-1 px-4 rounded-lg`}
                >
                    {processing ? "Loading..." : "Submit"}
                </button>
            </div>
        </form>
    );
};
