import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import SearchableSelect from "@/Components/SearchableSelect";
import PernyataanLegalitas from "@/Components/PernyataanLegalitas";

export const TabDaftarBeasiswa = ({ country }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        id_country: "",
        name: "",
        type: "",
        organizer: "",
        event_date_start: "",
        event_date_end: "",
        description: "",
        poster_url: "",
    });

    const countryOption = country.map((val) => {
        return { value: val.id, label: val.country_name };
    });

    const [posterKegiatan, setPosterKegiatan] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setData("poster_url", file);
        setPosterKegiatan(file);
    };

    const handleRemoveFile = () => {
        setPosterKegiatan(null);
        // Clear the file input field
        setData("poster_url", null);
        document.getElementById("fileInput").value = null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("scholarshipRegistrant.store"), {
            onSuccess: (res) => {
                reset();
                toast.success("Pendataan Pendaftar Beasiswa Berhasil Dibuat!");
            },
            onError: (errors) => {
                toast.error("Pendataan Pendaftar Beasiswa Gagal Dibuat!");
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
                <h2 className="text-xl font-bold mb-4">
                    Data Pendaftar Beasiswa
                </h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Nama Beasiswa<span className="text-red-600">*</span>
                    </label>
                    <input
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        type="text"
                        className="w-full border rounded-lg px-4"
                        placeholder="Contoh: Beasiswa Cipta Pelita Indonesia 2024"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="type"
                        className="block text-gray-700 font-bold mb-2"
                    >
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
                    <label className="block text-gray-700 font-bold mb-2">
                        Penyelenggara<span className="text-red-600">*</span>
                    </label>
                    <input
                        value={data.organizer}
                        onChange={(e) => setData("organizer", e.target.value)}
                        type="text"
                        className="w-full border rounded-lg px-4"
                        placeholder="Tuliskan penyelenggara kegiatan..."
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
                    <label
                        htmlFor="event_date_start"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Waktu Pelaksanaan Dimulai
                        <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="date"
                        value={data.event_date_start}
                        onChange={(e) =>
                            setData("event_date_start", e.target.value)
                        }
                        id="event_date_start"
                        className="w-full border rounded-lg px-4"
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
                        type="date"
                        value={data.event_date_end}
                        onChange={(e) =>
                            setData("event_date_end", e.target.value)
                        }
                        id="event_date_end"
                        className="w-full border rounded-lg px-4"
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
                        id="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full border rounded-lg px-4"
                        placeholder="Tulis teks disini..."
                    ></textarea>
                </div>
            </section>

            {/* Section Dokumen Pendukung */}
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Dokumen Pendukung</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Poster Kegiatan
                    </label>
                    <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center">
                        <p>Click to upload or drag and drop</p>
                        <p className="text-gray-500">Max. file size: 10MB</p>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
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
                        <li>
                            Poster beasiswa yang diikuti, menunjukkan nama
                            beasiswa.
                        </li>
                        <li>
                            Berkas yang diunggah dalam format: .jpg, .jpeg,
                            .png.
                        </li>
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
