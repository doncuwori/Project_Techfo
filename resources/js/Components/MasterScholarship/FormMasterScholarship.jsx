import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import { Upload } from "lucide-react";
import "react-quill/dist/quill.snow.css";

export const FormMasterScholarship = ({ previous, edit }) => {
    const { data, setData, post, processing, errors, reset, put } = useForm({
        name: previous?.name ?? "",
        id: previous?.id ?? "",
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        if (edit) {
            put(route("master-scholarship.update", data.id), {
                onSuccess: () => {
                    toast.success(
                        type === "lomba"
                            ? "Informasi Lomba berhasil diupdate"
                            : "Informasi Beasiswa berhasil diupdate"
                    );
                    reset();
                    setSelectedFile(null);
                },
                onError: (errors) => {
                    console.error(errors);
                    type === "lomba"
                        ? toast.error("Gagal memperbarui informasi lomba")
                        : toast.error("Gagal memperbarui informasi beasiswa");
                },
            });
            return;
        }

        post(route("master-scholarship.store"), {
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
                        Jenis Beasiswa<span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder={"Jenis Beasiswa"}
                    />
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
