import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import PernyataanLegalitas from "@/Components/PernyataanLegalitas";

const FormDaftarPenelitian = ({ information }) => {
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        id_research_information: information.id,
        telephone: "",
        khs: "",
        cv: "",
        portofolio: "",
        foto: "",
        surat_pernyataan: "",
    });

    const [isChecked, setIsChecked] = useState(false);

    const handleKhsChange = (event) => {
        const file = event.target.files[0];

        if (
            file &&
            file.size <= 2 * 1024 * 1024 &&
            /\.(pdf)$/i.test(file.name)
        ) {
            setData("khs", file);
        } else {
            toast.error("File tidak valid atau melebihi ukuran maksimal 2MB.");
            event.target.value = "";
        }
    };

    const handleCvChange = (event) => {
        const file = event.target.files[0];

        if (
            file &&
            file.size <= 2 * 1024 * 1024 &&
            /\.(pdf)$/i.test(file.name)
        ) {
            setData("cv", file);
        } else {
            toast.error("File tidak valid atau melebihi ukuran maksimal 2MB.");
            event.target.value = "";
        }
    };

    const handlePortofolioChange = (event) => {
        const file = event.target.files[0];
        
        if (
            file &&
            file.size <= 2 * 1024 * 1024 &&
            /\.(pdf)$/i.test(file.name)
        ) {
            setData("portofolio", file);
        } else {
            toast.error("File tidak valid atau melebihi ukuran maksimal 2MB.");
            event.target.value = "";
        }
    };

    const handleFotoChange = (event) => {
        const file = event.target.files[0];
        
        if (
            file &&
            file.size <= 2 * 1024 * 1024 &&
            /\.(jpg|jpeg|png)$/i.test(file.name)
        ) {
            setData("foto", file);
        } else {
            toast.error("File tidak valid atau melebihi ukuran maksimal 2MB.");
            event.target.value = "";
        }
    };

    const handleSuratPernyataanChange = (event) => {
        const file = event.target.files[0];
        
        if (
            file &&
            file.size <= 2 * 1024 * 1024 &&
            /\.(pdf)$/i.test(file.name)
        ) {
            setData("surat_pernyataan", file);
        } else {
            toast.error("File tidak valid atau melebihi ukuran maksimal 2MB.");
            event.target.value = "";
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("research-registrant.store"), {
            onSuccess: (res) => {
                console.log("success");
                reset();
                toast.success("Pendaftaran Penelitan Berhasil!");
            },
            onError: (errors) => {
                toast.error("Pendaftaran Penelitan Gagal!");
                console.error(errors);
            },
        });
    };

    return (
        <div>
            <section>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Nama Penelitian
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-lg p-2 bg-gray-100"
                            value={information.name}
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Alamat E-mail<span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-lg p-2 bg-gray-100"
                            placeholder="Masukkan Alamat Email Anda"
                            disabled
                            value={auth.mahasiswa.email}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Nomor Telepon (Whatsapp)
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="number"
                            className="w-full border rounded-lg p-2"
                            placeholder="Masukkan Nomor Telepon Anda"
                            onChange={(e) =>
                                setData("telephone", e.target.value)
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            KHS<span className="text-red-600">*</span>
                        </label>
                        <input
                            type="file"
                            className="w-full border rounded-lg p-2"
                            onChange={handleKhsChange}
                            accept=".pdf"
                        />
                        <p className="text-gray-500 text-sm mt-2">
                            Tipe file yang dapat diunggah adalah .pdf, dengan
                            ukuran file maksimal 2MB.
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            CV<span className="text-red-600">*</span>
                        </label>
                        <input
                            type="file"
                            className="w-full border rounded-lg p-2"
                            onChange={handleCvChange}
                            accept=".pdf"
                        />
                        <p className="text-gray-500 text-sm mt-2">
                            Tipe file yang dapat diunggah adalah .pdf, dengan
                            ukuran file maksimal 2MB.
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Portofolio<span className="text-red-600">*</span>
                        </label>
                        <input
                            type="file"
                            className="w-full border rounded-lg p-2"
                            onChange={handlePortofolioChange}
                            accept=".pdf"
                        />
                        <p className="text-gray-500 text-sm mt-2">
                            Tipe file yang dapat diunggah adalah .pdf, dengan
                            ukuran file maksimal 2MB.
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Foto 3x4<span className="text-red-600">*</span>
                        </label>
                        <input
                            type="file"
                            className="w-full border rounded-lg p-2"
                            onChange={handleFotoChange}
                            accept=".jpg,.jpeg,.png"
                        />
                        <p className="text-gray-500 text-sm mt-2">
                            Tipe file yang dapat diunggah adalah .jpg, .jpeg,
                            dan .png, dengan ukuran file maksimal 2MB.
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Surat Pernyataan
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="file"
                            className="w-full border rounded-lg p-2"
                            onChange={handleSuratPernyataanChange}
                            accept=".pdf"
                        />
                        <li className="text-gray-500 text-sm mt-2">
                            Silakan unduh format Surat Pernyataan berikut{" "}
                            <a
                                href="https://docs.google.com/document/d/1CVVZ5QVGaUt6n9p--qwe7RemYDE4EdUNjUOWHnM371c/edit?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                unduh file surat pernyataan;{" "}
                            </a>
                        </li>
                        <li className="text-gray-500 text-sm mt-2">
                            Wajib melampirkan Materai Rp 10.000.
                        </li>
                        <li className="text-gray-500 text-sm mt-2">
                            Tipe file yang dapat diunggah adalah .pdf, dengan
                            ukuran file maksimal 2MB.
                        </li>
                    </div>
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
            </section>
        </div>
    );
};

export default FormDaftarPenelitian;
