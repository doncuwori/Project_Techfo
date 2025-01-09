import React from "react";
import { useForm } from "@inertiajs/react";

const UploadSuratTugas = ({ abdimas }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        surat_tugas: null,
        id: abdimas.id
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setData("surat_tugas", file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pusatAbdimas.uploadSurat"), {
            onSuccess: (res) => {
                console.log("success");
                reset();
                toast.success("Prestasi Lomba Berhasil Dibuat");
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

    return (
        <div class="overflow-x-auto mt-4 border">
            <h2 className="p-4 font-bold">Upload Surat Tugas</h2>
            <div className="flex flex-col gap-2 p-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Surat Tugas
                </label>
                {abdimas.surat_tugas ? (
                    <div>
                        <a
                            href={'/surat/'+abdimas.surat_tugas}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            Lihat File
                        </a>
                    </div>
                ) : (
                    <input
                        type="file"
                        accept="application/pdf"
                        class="w-full p-4 border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:border-blue-500 focus:border-blue-500 rounded-md shadow-sm"
                        onChange={handleFileChange}
                    />
                )}
            </div>
            {abdimas.surat_tugas ? (
                ""
            ) : (
                <div class="flex justify-end mt-4 p-4">
                    <button onClick={handleSubmit} class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                        Upload Surat Tugas
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadSuratTugas;
