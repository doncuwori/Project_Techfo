import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export const FormLombaBeasiswa = ({ type, previous, edit }) => {
    const [selectedFile, setSelectedFile] = useState(previous?.poster_url ? {
        name: previous?.poster_url ?? "",
    } : null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: previous?.name ?? "",
        organizer: previous?.organizer ?? "",
        event_time_start: previous?.event_time_start ? new Date(Date.parse(previous.event_time_start) + 1000 * 60 * 60 * 24).toISOString().split('T')[0] : "",
        event_time_end: previous?.event_time_end ? new Date(Date.parse(previous.event_time_end) + 1000 * 60 * 60 * 24).toISOString().split('T')[0] : "",
        description: previous?.description ?? "",
        poster_url: previous?.poster_url ?? "",
        activity_link: previous?.activity_link ?? "",
        guidebook_link: previous?.guidebook_link ?? "",
    });
    

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        
        if (file && file.size > 1048576) {
            toast.error("Ukuran file maksimal 1MB.");
            return;
        }
        setSelectedFile(file);

        setData("poster_url", file);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        document.getElementById("fileInput").value = null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const routeName =

        function routeName() {
            console.log(type, edit);
            if (type === "lomba" && !edit) {
                return route("competitionInformation.store");
            } else if (type === "lomba" && edit) {
                return route("competitionInformation.update", previous.id);
            } else if (type === "beasiswa" && !edit) {
                return route("scholarshipInformation.store");
            } else if (type === "beasiswa" && edit) {
                return route("scholarshipInformation.update", previous.id);
            }
        }

        console.log(routeName());

        post(routeName(), {
            onSuccess: () => {
                toast.success(
                    type === "lomba"
                        ? "Informasi Lomba berhasil ditambahkan"
                        : "Informasi Beasiswa berhasil ditambahkan"
                );
                reset();
                setSelectedFile(null);
            },
            onError: (errors) => {
                console.error(errors);
                type === "lomba"
                    ? toast.error("Gagal menambahkan informasi lomba")
                    : toast.error("Gagal menambahkan informasi beasiswa");
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <section className="mb-8">
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Nama Kegiatan<span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="Contoh: Kegiatan Karya Tulis Ilmiah Nasional Tahun 2017"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="organizer"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Penyelenggara<span className="text-red-600">*</span>
                    </label>
                    <input
                        id="organizer"
                        type="text"
                        value={data.organizer}
                        onChange={(e) => setData("organizer", e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="Tuliskan penyelenggara kegiatan..."
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="event_time_start"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Waktu Pelaksanaan<span className="text-red-600">*</span>
                    </label>
                    <input
                        id="event_time_start"
                        type="date"
                        value={data.event_time_start}
                        onChange={(e) => setData("event_time_start", e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="event_time_end"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Waktu Berakhir<span className="text-red-600">*</span>
                    </label>
                    <input
                        id="event_time_end"
                        type="date"
                        value={data.event_time_end}
                        onChange={(e) => setData("event_time_end", e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="description"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Deskripsi Kegiatan<span className="text-red-600">*</span>
                    </label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="Tuliskan deskripsi disini..."
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="activity_link"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Tautan Kegiatan<span className="text-red-600">*</span>
                    </label>
                    <input
                        type="url"
                        id="activity_link"
                        value={data.activity_link}
                        onChange={(e) => setData("activity_link", e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="Masukkan tautan terkait kegiatan..."
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="guidebook_link"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Tautan Buku Panduan<span className="text-red-600">*</span>
                    </label>
                    <input
                        type="url"
                        id="guidebook_link"
                        value={data.guidebook_link}
                        onChange={(e) => setData("guidebook_link", e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="Masukkan tautan buku panduan..."
                    />
                </div>
            </section>
            <section className="mb-8">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Poster Kegiatan<span className="text-red-600">*</span>
                    </label>
                    <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center">
                        <p>Click to upload or drag and drop</p>
                        <p className="text-gray-500">Max. file size: 1MB</p>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="hidden"
                            id="fileInput"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="fileInput"
                            className="mt-2 bg-green-500 text-white py-1 px-4 rounded-lg cursor-pointer inline-block"
                        >
                            Browse File
                        </label>
                        {selectedFile && (
                            <div className="mt-4 flex items-center justify-center">
                                <p className="text-green-500 mr-2">
                                    {selectedFile.name}
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
                            Poster Kegiatan lomba yang diikuti, menunjukkan nama
                            lomba;
                        </li>
                        <li>
                            Tipe file yang dapat diunggah antara lain: .jpg,
                            .jpeg, .png;
                        </li>
                        <li>Ukuran file maksimal 1MB.</li>
                    </ul>
                </div>
            </section>

            <div className="flex justify-end w-full">
                <button
                    type="submit"
                    className="mt-2 bg-orange-500 text-white py-1 px-4 rounded-lg"
                    disabled={processing}
                >
                    {processing ? "Loading..." : "Submit"}
                </button>
            </div>
        </form>
    );
};