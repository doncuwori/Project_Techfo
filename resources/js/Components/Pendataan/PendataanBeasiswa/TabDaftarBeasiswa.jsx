import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import SearchableSelect from "@/Components/SearchableSelect";
import PernyataanLegalitas from "@/Components/PernyataanLegalitas";

export const TabDaftarBeasiswa = ({ country }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        type: "",
        organizer: "",
        host_country: "",
        event_date: "",
        description: "",
        proof_scan_url: null, 
    });

    const countryOption = country.map((val) => {
        return { value: val.id, label: val.country_name };
    });

    const [posterKegiatan, setPosterKegiatan] = useState(null); 

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPosterKegiatan(file);
            setData("proof_scan_url", file); 
        }
    };

    const handleRemoveFile = () => {
        setPosterKegiatan(null); 
        setData("proof_scan_url", null); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("type", data.type);
        formData.append("organizer", data.organizer);
        formData.append("host_country", data.host_country);
        formData.append("event_date", data.event_date);
        formData.append("description", data.description);
        if (posterKegiatan) {
            formData.append("proof_scan_url", posterKegiatan); // Tambahkan file ke form data
        }

        post(route("scholarshipRegistrant.store"), {
            data: formData,
            onSuccess: () => {
                reset(); // Reset form setelah sukses
                toast.success("Berhasil Membuat Data Lolos Beasiswa");
            },
            onError: (errors) => {
                toast.error("Gagal Membuat Data Lolos Beasiswa");
                console.error(errors);
            },
        });
    };

    const handleCountry = (value) => {
        setData("id_country", value.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Section Data Pendaftar Beasiswa */}
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Data Pendaftar Beasiswa</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Nama Beasiswa<span className="text-red-600">*</span>
                    </label>
                    <input
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        type="text"
                        className="w-full border rounded-lg px-4"
                        placeholder="Contoh: Lomba Karya Tulis Ilmiah Nasional Tahun 2017"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                        Jenis Beasiswa<span className="text-red-600">*</span>
                    </label>
                    <select
                        value={data.type}
                        onChange={(e) => setData("type", e.target.value)}
                        id="type"
                        className="w-full border rounded-lg px-4"
                    >
                        <option>-- Pilih Jenis Beasiswa --</option>
                        <option>Beasiswa dari Pemerintah</option>
                        <option>Beasiswa Swasta</option>
                        <option>Beasiswa dari Negara Maju</option>
                        <option>Beasiswa dari Komunitas</option>
                        <option>Beasiswa dari Perguruan Tinggi</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Penyelenggara<span className="text-red-600">*</span></label>
                    <input
                        value={data.organizer}
                        onChange={(e) => setData("organizer", e.target.value)}
                        type="text"
                        className="w-full border rounded-lg px-4"
                        placeholder="Tuliskan penyelenggara kegiatan..."
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="host_country" className="block text-gray-700 font-bold mb-2">
                        Negara Penyelenggara<span className="text-red-600">*</span>
                    </label>
                    <SearchableSelect
                        onChange={handleCountry}
                        options={countryOption}
                        placeholder={"-- Pilih Negara Penyelenggara --"}
                    />
                    {/* <select
                        value={data.host_country}
                        onChange={(e) => setData("host_country", e.target.value)}
                        id="host_country"
                        className="w-full border rounded-lg px-4"
                    >
                        <option>Pilih Negara Penyelenggara</option>
                        <option>Indonesia</option>
                        <option>Malaysia</option>
                    </select> */}
                </div>
                <div className="mb-4">
                    <label htmlFor="event_date" className="block text-gray-700 font-bold mb-2">
                        Waktu Pelaksanaan<span className="text-red-600">*</span>
                    </label>
                    <input
                        type="date"
                        value={data.event_date}
                        onChange={(e) => setData("event_date", e.target.value)}
                        id="event_date"
                        className="w-full border rounded-lg px-4"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="event_date" className="block text-gray-700 font-bold mb-2">
                        Waktu Berakhir<span className="text-red-600">*</span>
                    </label>
                    <input
                        type="date"
                        value={data.event_date}
                        onChange={(e) => setData("event_date", e.target.value)}
                        id="event_date"
                        className="w-full border rounded-lg px-4"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                        Deskripsi Kegiatan<span className="text-red-600">*</span>
                    </label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full border rounded-lg px-4"
                        placeholder="Write text here..."
                    ></textarea>
                </div>
            </section>

            {/* Section Dokumen Pendukung */}
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Dokumen Pendukung</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Poster Kegiatan</label>
                    <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center">
                        <p>Click to upload or drag and drop</p>
                        <p className="text-gray-500">Max. file size: 10MB</p>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="hidden"
                            id="poster-kegiatan"
                            onChange={handleFileChange}
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
                                    onClick={handleRemoveFile}
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
                        <li>Poster beasiswa yang diikuti, menunjukkan nama beasiswa;</li>
                        <li>Tipe file yang dapat diunggah antara lain: .jpg, .jpeg, .png;</li>
                        <li>Ukuran file maksimal 1MB.</li>
                    </ul>
                </div>
            </section>

            {/* Pernyataan Legalitas */}
            <PernyataanLegalitas />

            {/* Submit Button */}
            <div className="flex justify-end w-full">
                <button
                    type="submit"
                    className="mt-2 bg-orange-500 text-white py-1 px-4 rounded-lg"
                    disabled={processing} // Menonaktifkan tombol saat sedang diproses
                >
                    Submit
                </button>
            </div>
        </form>
    );
};